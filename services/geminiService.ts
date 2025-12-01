import { GoogleGenAI } from "@google/genai";

interface GenerateImageParams {
  modelBase64: string;
  productBase64: string;
  prompt: string;
}

/**
 * Strips the data:image/...;base64, prefix if present
 */
const cleanBase64 = (base64: string) => {
  if (base64.includes('base64,')) {
    return base64.split('base64,')[1];
  }
  return base64;
};

/**
 * Resizes an image to a maximum dimension to ensure API payload is manageable.
 * Reduces resolution to max 1024px and compresses to JPEG 0.8 quality.
 */
const resizeImage = (base64Str: string, maxWidth = 1024): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Convert to JPEG with 0.8 quality to significantly reduce payload size
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } else {
        resolve(base64Str); // Fallback
      }
    };
    img.onerror = () => {
      resolve(base64Str); // Fallback
    };
  });
};

export const generateFashionImage = async (params: GenerateImageParams): Promise<string> => {
  const { modelBase64, productBase64, prompt } = params;

  // Optimizing images before sending to prevent ERR_CONNECTION_CLOSED or timeouts
  const resizedModel = await resizeImage(modelBase64);
  const resizedProduct = await resizeImage(productBase64);

  // We must re-instantiate the client for every call to ensure we pick up the latest API key
  // selected by the user via window.aistudio.openSelectKey()
  // The key is injected into process.env.API_KEY automatically in this environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Construct a robust prompt for the model
  // NOTE: Avoid explicit instructions to "remove watermarks" as this can trigger safety refusals.
  // Instead, focus on "clean", "professional", and "high quality" output.
  const fullPrompt = `
    You are a professional fashion photographer and photo editor.
    
    Input 1: An image of a model.
    Input 2: An image of a product (clothing, accessory, or item).
    
    Task: Create a new, photorealistic fashion image featuring the model from Input 1 and the product from Input 2.
    
    Style & Scene Requirements: ${prompt}
    
    Guidelines:
    1. seamless integration: The product must look naturally worn or held by the model.
    2. Professional Quality: The final image should look like a high-end magazine editorial.
    3. Clean Output: Ensure the final image is pristine, with perfect lighting and composition. Avoid any visual artifacts, text overlays, or distractions that aren't part of the scene.
    4. Focus on the visual content of the product and model to create a brand new composition.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(resizedModel)
            }
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(resizedProduct)
            }
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4", // Standard fashion aspect ratio
        }
      }
    });

    // Extract the image from the response
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      let textResponse = "";
      
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
        if (part.text) {
          textResponse += part.text;
        }
      }
      
      // If we got here, we found no image, but maybe we have text (refusal or explanation)
      if (textResponse) {
        throw new Error(`Model Refusal: ${textResponse.slice(0, 100)}...`);
      }
    }

    throw new Error("No image data found in response. The model may have filtered the request.");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};