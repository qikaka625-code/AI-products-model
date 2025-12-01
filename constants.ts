import { GenerationPreset } from './types';

export const PRESETS: GenerationPreset[] = [
  // Standing
  { id: '1', label: 'Standing - Studio Grey', category: 'Standing', prompt: 'Full body shot, standing confidently, minimalist grey studio background, professional lighting.' },
  { id: '2', label: 'Standing - Street Fashion', category: 'Standing', prompt: 'Full body shot, standing on a busy urban street, daylight, blurred city background, street style.' },
  { id: '3', label: 'Standing - Garden', category: 'Standing', prompt: 'Full body shot, standing in a lush blooming garden, sunlight filtering through leaves, soft dreamy atmosphere.' },
  { id: '4', label: 'Standing - Neon Night', category: 'Standing', prompt: 'Full body shot, standing in a cyberpunk city street at night, neon blue and pink lighting, dramatic contrast.' },
  { id: '5', label: 'Standing - Beach', category: 'Standing', prompt: 'Full body shot, standing on a white sand beach, clear blue sky, ocean waves in background, bright natural light.' },
  { id: '6', label: 'Standing - Luxury Hall', category: 'Standing', prompt: 'Full body shot, standing in a marble luxury hotel lobby, golden chandeliers, elegant atmosphere.' },
  { id: '31', label: 'Standing - Red Carpet', category: 'Standing', prompt: 'Full body shot, standing on a red carpet event, paparazzi flash photography, glamourous night atmosphere.' },
  { id: '32', label: 'Standing - Desert Dunes', category: 'Standing', prompt: 'Full body shot, standing on golden sand dunes at sunset, vast desert horizon, warm orange lighting.' },
  { id: '33', label: 'Standing - Snowy Street', category: 'Standing', prompt: 'Full body shot, standing in a snowy city street, falling snowflakes, winter fashion vibe, cool tones.' },
  { id: '34', label: 'Standing - Art Gallery', category: 'Standing', prompt: 'Full body shot, standing in a modern art gallery, clean white walls with abstract paintings, sophisticated vibe.' },
  
  // Sitting
  { id: '7', label: 'Sitting - Modern Sofa', category: 'Sitting', prompt: 'Sitting comfortably on a modern beige sofa, interior design studio setting, soft warm lighting.' },
  { id: '8', label: 'Sitting - Cafe Stool', category: 'Sitting', prompt: 'Sitting on a high stool in a cozy coffee shop, wooden textures, warm ambient lighting, casual look.' },
  { id: '9', label: 'Sitting - Concrete Steps', category: 'Sitting', prompt: 'Sitting on concrete steps, urban grunge style, overcast soft lighting, cool tones.' },
  { id: '10', label: 'Sitting - Picnic Grass', category: 'Sitting', prompt: 'Sitting on green grass in a park, picnic setting, bright sunny day, joyful atmosphere.' },
  { id: '11', label: 'Sitting - Office Chair', category: 'Sitting', prompt: 'Sitting in a professional ergonomic office chair, glass windows background, corporate setting.' },
  { id: '12', label: 'Sitting - Vintage Armchair', category: 'Sitting', prompt: 'Sitting in a velvet vintage armchair, dark moody library background, classic elegant style.' },
  { id: '35', label: 'Sitting - Poolside Lounge', category: 'Sitting', prompt: 'Sitting on a lounge chair by a turquoise swimming pool, sunny summer day, palm trees in background.' },
  { id: '36', label: 'Sitting - Classic Car', category: 'Sitting', prompt: 'Sitting on the hood of a vintage classic car, retro styling, sunset lighting, nostalgic road trip vibe.' },
  { id: '37', label: 'Sitting - Rooftop Bar', category: 'Sitting', prompt: 'Sitting at a high-end rooftop bar table, city skyline lights in background, evening cocktail atmosphere.' },
  { id: '38', label: 'Sitting - Library Steps', category: 'Sitting', prompt: 'Sitting casually on wooden library ladder steps, surrounded by books, academic chic aesthetic.' },

  // Side View
  { id: '13', label: 'Side - Profile Studio', category: 'Side', prompt: 'Side profile view, standing, solid white background, high key fashion photography.' },
  { id: '14', label: 'Side - Walking Street', category: 'Side', prompt: 'Side view, walking dynamically down a city crosswalk, motion blur in background, street photography.' },
  { id: '15', label: 'Side - Looking Away', category: 'Side', prompt: 'Side profile, looking into the distance, mountain landscape background, adventurous vibe.' },
  { id: '16', label: 'Side - Window Reflection', category: 'Side', prompt: 'Side view, standing near a large window, city skyline reflection, moody sunset lighting.' },
  { id: '17', label: 'Side - Spotlight', category: 'Side', prompt: 'Side profile, dramatic single spotlight on black background, artistic silhouette.' },
  { id: '18', label: 'Side - Runway', category: 'Side', prompt: 'Side view, walking on a fashion runway, audience blurred in background, runway lights.' },
  { id: '39', label: 'Side - Subway Motion', category: 'Side', prompt: 'Side view, standing on a subway platform, speeding train blurred in background, urban cinematic look.' },
  { id: '40', label: 'Side - Forest Trail', category: 'Side', prompt: 'Side view, walking along a misty forest trail, tall pine trees, soft diffused natural light.' },
  { id: '41', label: 'Side - Balcony View', category: 'Side', prompt: 'Side view, leaning on a balcony railing, overlooking a Mediterranean coast, bright and airy.' },
  { id: '42', label: 'Side - Concrete Wall', category: 'Side', prompt: 'Side view, leaning against a raw concrete wall, industrial architecture, sharp shadows.' },

  // Close-up / Detail
  { id: '19', label: 'Upper Body - Portrait', category: 'Close-up', prompt: 'Upper body portrait, looking at camera, soft studio lighting, neutral bokeh background.' },
  { id: '20', label: 'Upper Body - Golden Hour', category: 'Close-up', prompt: 'Upper body shot, outdoor golden hour sunlight, lens flare, warm cinematic look.' },
  { id: '21', label: 'Detail - Product Focus', category: 'Close-up', prompt: 'Close up shot focusing on the product details, shallow depth of field, macro photography style.' },
  { id: '22', label: 'Portrait - Black & White', category: 'Close-up', prompt: 'Black and white portrait, high contrast, dramatic shadows, timeless fashion look.' },
  { id: '23', label: 'Upper Body - Floral', category: 'Close-up', prompt: 'Upper body shot, surrounded by hanging flowers, spring fashion theme, pastel colors.' },
  { id: '24', label: 'Upper Body - Tech', category: 'Close-up', prompt: 'Upper body shot, clean white tech minimalist background, futuristic lighting.' },
  { id: '43', label: 'Upper Body - Rain Glass', category: 'Close-up', prompt: 'Upper body shot, seen through a rainy glass window, water droplets, moody blue tones.' },
  { id: '44', label: 'Upper Body - Prism', category: 'Close-up', prompt: 'Upper body shot, artistic light leaks and prism refractions, dreamy rainbow effects.' },
  { id: '45', label: 'Upper Body - Noir', category: 'Close-up', prompt: 'Upper body shot, film noir style, venetian blind shadows across face, mysterious atmosphere.' },
  { id: '46', label: 'Upper Body - Neon Bokeh', category: 'Close-up', prompt: 'Upper body shot, night city background with colorful round bokeh lights, shallow depth of field.' },

  // Creative / Abstract
  { id: '25', label: 'Creative - Floating', category: 'Creative', prompt: 'Surreal concept, model appears to be floating, blue sky with fluffy clouds background.' },
  { id: '26', label: 'Creative - Color Pop', category: 'Creative', prompt: 'Fashion pop art style, bright solid color geometric background, bold contrast.' },
  { id: '27', label: 'Creative - Mirror', category: 'Creative', prompt: 'Reflection in a shattered mirror, artistic fragmentation, edgy fashion editorial.' },
  { id: '28', label: 'Creative - Forest Fog', category: 'Creative', prompt: 'Standing in a dense misty forest, cinematic mysterious atmosphere, dark green tones.' },
  { id: '29', label: 'Creative - Studio Smoke', category: 'Creative', prompt: 'Studio shot with colored smoke effects, dynamic movement, high fashion creative.' },
  { id: '30', label: 'Creative - Glitch', category: 'Creative', prompt: 'Cyberpunk style, digital glitch effects overlay, neon background, futuristic fashion.' },
  { id: '47', label: 'Creative - Underwater', category: 'Creative', prompt: 'Underwater fashion photography, weightless hair and fabric, caustic light patterns, ethereal blue.' },
  { id: '48', label: 'Creative - Paper Cutout', category: 'Creative', prompt: 'Model placed inside a layered paper cutout art style world, craft aesthetic, soft shadows.' },
  { id: '49', label: 'Creative - Cyber Grid', category: 'Creative', prompt: 'Standing in a virtual reality Tron-like grid world, glowing wireframes, retro-futuristic 80s style.' },
  { id: '50', label: 'Creative - Cloud Realm', category: 'Creative', prompt: 'Standing on top of clouds, heavenly golden sunlight, fantasy fashion editorial.' },
];