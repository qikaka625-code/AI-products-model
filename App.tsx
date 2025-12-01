import React, { useState, useMemo } from 'react';
import { UploadZone } from './components/UploadZone';
import { generateFashionImage } from './services/geminiService';
import { PRESETS } from './constants';
import { GeneratedImage } from './types';

const App: React.FC = () => {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(PRESETS.map(p => p.category)))];
  }, []);

  const filteredPresets = useMemo(() => {
    return selectedCategory === 'All' 
      ? PRESETS 
      : PRESETS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleGenerate = async (presetId: string, prompt: string) => {
    // Validation
    if (!modelImage || !productImage) {
      setErrorMsg("Please upload both a Model image and a Product image first.");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    if (generatedImages.length >= 3) {
      setErrorMsg("Maximum of 3 images allowed. Please clear a slot.");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      // Create a temporary placeholder for UI feedback
      const tempId = Date.now().toString();
      
      const imageUrl = await generateFashionImage({
        modelBase64: modelImage,
        productBase64: productImage,
        prompt: prompt
      });

      const newImage: GeneratedImage = {
        id: tempId,
        url: imageUrl,
        prompt: prompt,
        timestamp: Date.now()
      };

      setGeneratedImages(prev => [...prev, newImage]);

    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Failed to generate image. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const removeGeneratedImage = (id: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1e1f20] text-white p-4 md:p-6 overflow-hidden font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 border-b border-[#333] pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-100">Fashion Studio AI</h1>
            <p className="text-xs text-neutral-400">Powered by Gemini 2.5 Flash Image</p>
          </div>
        </div>
      </header>

      {/* Error Message Toast */}
      {errorMsg && (
        <div className="fixed top-20 right-6 z-50 bg-red-600/90 text-white px-4 py-2 rounded shadow-lg animate-bounce backdrop-blur-md">
          {errorMsg}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col md:flex-row gap-6 min-h-0">
        
        {/* Left: Inputs (Fixed Width & Height) */}
        <section className="flex-shrink-0 w-full md:w-[260px] flex flex-col gap-4">
          <div className="h-[272px] w-full">
            <UploadZone 
              label="1. Model Image" 
              image={modelImage} 
              onUpload={setModelImage} 
              onClear={() => setModelImage(null)} 
            />
          </div>
          <div className="h-[272px] w-full">
            <UploadZone 
              label="2. Product Image" 
              image={productImage} 
              onUpload={setProductImage} 
              onClear={() => setProductImage(null)} 
            />
          </div>
        </section>

        {/* Right: Gallery Display (Flexible Width, Fixed Height Slots) */}
        <section className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 min-w-0">
          {[0, 1, 2].map((index) => {
            const img = generatedImages[index];
            return (
              <div 
                key={index} 
                className="relative bg-[#0f1011] rounded-xl border border-[#333] flex items-center justify-center overflow-hidden h-[560px] group shadow-inner"
              >
                {/* Empty State */}
                {!img && !isGenerating && (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-[#1e1f20] flex items-center justify-center mx-auto mb-4 border border-[#333]">
                      <span className="text-neutral-600 text-xl font-bold">{index + 1}</span>
                    </div>
                    <p className="text-neutral-500 text-sm font-medium">Select a style to generate</p>
                  </div>
                )}

                {/* Loading State (Only for the next available slot) */}
                {isGenerating && index === generatedImages.length && (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-yellow-500 text-sm animate-pulse font-medium">Creating masterpiece...</p>
                  </div>
                )}

                {/* Image Display */}
                {img && (
                  <>
                    <div className="absolute inset-0 p-2">
                       <img 
                        src={img.url} 
                        alt="Generated Fashion" 
                        className="w-full h-full object-contain drop-shadow-2xl" 
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                      <p className="text-xs text-neutral-300 line-clamp-2 mb-3 italic">"{img.prompt}"</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => window.open(img.url, '_blank')}
                          className="flex-1 bg-white text-black py-2 px-3 rounded font-medium text-xs hover:bg-neutral-200 transition-colors shadow-lg"
                        >
                          Download High Res
                        </button>
                        <button 
                          onClick={() => removeGeneratedImage(img.id)}
                          className="bg-neutral-800 hover:bg-red-900/80 text-white p-2 rounded transition-colors border border-neutral-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </section>
      </main>

      {/* Footer: Presets */}
      <footer className="mt-6 pt-6 border-t border-[#333] flex-shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <h2 className="text-sm font-medium text-neutral-300 whitespace-nowrap">
              Style Presets ({filteredPresets.length})
            </h2>
            <div className="h-4 w-px bg-[#333] mx-1 flex-shrink-0"></div>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200
                    ${selectedCategory === cat 
                      ? 'bg-yellow-500 text-black shadow-md shadow-yellow-500/20' 
                      : 'bg-[#2a2b2d] text-neutral-400 hover:bg-[#333] hover:text-neutral-200 border border-transparent hover:border-[#444]'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <span className="text-xs text-neutral-500 hidden md:block whitespace-nowrap px-2">Click to generate • Consumes 1 slot</span>
        </div>
        
        <div className="overflow-x-auto pb-2 preset-grid">
           <div className="flex flex-wrap gap-3 h-48 overflow-y-auto pr-2 content-start w-full">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleGenerate(preset.id, preset.prompt)}
                disabled={isGenerating || generatedImages.length >= 3}
                className={`
                  flex-shrink-0 w-[calc(50%-6px)] md:w-[calc(20%-10px)] 
                  text-left p-3 rounded-lg border text-xs transition-all duration-200 relative overflow-hidden group
                  ${
                    isGenerating || generatedImages.length >= 3
                    ? 'opacity-40 cursor-not-allowed border-[#333] bg-[#222]' 
                    : 'bg-[#2a2b2d] border-[#333] hover:border-yellow-500/50 hover:bg-[#323336] hover:shadow-lg hover:-translate-y-0.5'
                  }
                `}
              >
                <div className="flex justify-between items-start mb-1 relative z-10">
                  <span className="font-semibold text-neutral-200 group-hover:text-yellow-500 transition-colors">{preset.label.split(' - ')[0]}</span>
                  <span className="text-[9px] uppercase tracking-wider bg-[#1a1b1c] px-1.5 py-0.5 rounded text-neutral-500 border border-[#333]">{preset.category}</span>
                </div>
                <div className="text-neutral-400 truncate relative z-10">{preset.label.split(' - ')[1] || preset.label}</div>
              </button>
            ))}
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;