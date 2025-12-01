import React, { useRef } from 'react';

interface UploadZoneProps {
  label: string;
  image: string | null;
  onUpload: (base64: string) => void;
  onClear: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ label, image, onUpload, onClear }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onUpload(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h3 className="text-sm font-medium text-neutral-400 mb-2 uppercase tracking-wide">{label}</h3>
      <div className="relative flex-grow w-full bg-[#2d2e30] rounded-xl border-2 border-dashed border-[#444] hover:border-[#666] transition-colors overflow-hidden group">
        
        {image ? (
          <>
            <div className="absolute inset-0 p-2">
              <img src={image} alt={label} className="w-full h-full object-contain" />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
              <button 
                onClick={onClear}
                className="bg-red-500/80 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </>
        ) : (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <svg className="w-8 h-8 text-neutral-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-neutral-500 text-sm">Upload Image</span>
          </div>
        )}
        
        <input 
          type="file" 
          ref={inputRef}
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};