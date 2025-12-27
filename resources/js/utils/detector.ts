// import toast from 'react-hot-toast';

// const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//             // The result includes the mime type prefix, so we split it off
//             const base64Data = reader.result.split(',')[1];
//             resolve(base64Data);
//         };
//         reader.onerror = (error) => reject(error);
//     });
// };

// export const AIImageDetector = async (imageFile) => {
//     const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
//     if (!imageFile) {
//         toast.error('Please upload an image first.');
//         return;
//     }

//     try {
//         // 1. Convert the image to base64
//         const base64Data = await fileToBase64(imageFile);
//         const mimeType = imageFile.type;

//         // 2. Set up the API call
//         // DO NOT add your API key here. The environment will provide it.
//         const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
//         const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

//         // 3. Define the prompt for the model
//         const prompt = `
//         Analyze the provided image to determine if it is AI-generated.
//         Respond with only one word: "True" if it is AI-generated, or "False" if it is not.
//         Do not provide any explanation, just the single word "True" or "False".
//       `;

//         // 4. Construct the request payload
//         const payload = {
//             contents: [
//                 {
//                     role: 'user',
//                     parts: [
//                         { text: prompt },
//                         {
//                             inlineData: {
//                                 mimeType: mimeType,
//                                 data: base64Data,
//                             },
//                         },
//                     ],
//                 },
//             ],
//         };

//         // 5. Make the API call
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(
//                 errorData.error?.message || 'An unknown error occurred.',
//             );
//         }

//         const result = await response.json();

//         // 6. Process the response
//         const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
//         if (text) {
//             // We'll trim any whitespace just in case
//             return true;
//         } else {
//             throw new Error('No valid analysis found in the API response.');
//         }
//     } catch (err) {
//         console.error(err);
//         toast.error(`Failed to analyze image: ${err.message}`);
//     }
// };

import * as exifr from 'exifr';
import toast from 'react-hot-toast';

/**
 * Convert File object to Base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Check if image is SVG or edited/AI-generated based on Exif
 */
const isBlockedImage = async (file: File): Promise<boolean> => {
  // Reject SVG
  if (file.type === 'image/svg+xml') {
    toast.error('SVG files are not allowed.');
    return true;
  }

  try {
    const metadata = await exifr.parse(file);
    const software = (metadata?.Software || metadata?.CreatorTool || '').toLowerCase();
    const blockedKeywords = [
      'photoshop',
      'gimp',
      'illustrator',
      'midjourney',
      'dall-e',
      'stable diffusion',
      'ai',
    ];

    // Block if edited with known software
    if (blockedKeywords.some((kw) => software.includes(kw))) {
      toast.error('Edited or AI-generated images are not allowed.');
      return true;
    }

    // Block if camera info missing (common for AI images)
    if (!metadata?.latitude && !metadata?.longitude) return true;

    return false; // allowed
  } catch (err) {
    console.error('Exif parse error', err);
    toast.error('Cannot read image metadata.');
    return true; // block if metadata cannot be read
  }
};

import * as exifr from "exifr";

export async function extractImageMetadata(image) {
  try {
    const exif = await exifr.parse(image, {
      // Only request what we need (faster)
      pick: [
        "Make",
        "Model",
        "LensModel",
        "FocalLength",
        "FNumber",
        "ExposureTime",
        "ISO",
        "DateTimeOriginal"
      ]
    });

    if (!exif) return null;

    return {
      camera_brand: exif.Make || null,
      camera_model: exif.Model || null,
      lens: exif.LensModel || null,
      focal_length: exif.FocalLength ? `${exif.FocalLength} mm` : null,
      aperture: exif.FNumber ? `f/${exif.FNumber}` : null,
      shutter_speed: exif.ExposureTime
        ? `1/${Math.round(1 / exif.ExposureTime)}`
        : null,
      iso: exif.ISO || null,
      date_captured: exif.DateTimeOriginal || null
    };
  } catch (error) {
    console.error("Failed to extract EXIF data:", error);
    return null;
  }
}

/**
 * Main AI Image Detector
 * Returns true if AI-generated, false otherwise
 */
export const AIImageDetector = async (imageFile: File, category: string): Promise<boolean | undefined> => {
  // if (!imageFile) {
  //   toast.error('Please upload an image first.');
  //   return true;
  // }


  // // 1️⃣ Check if file is blocked
  // const blocked = await isBlockedImage(imageFile);
  // // console.log(blocked)
  // if (blocked) return true;

  try {
    // 2️⃣ Convert to Base64
    const base64Data = await fileToBase64(imageFile);
    const mimeType = imageFile.type;

    // 3️⃣ Gemini API key and endpoint
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    // 4️⃣ Define prompt
    const prompt = `
      you will receive an image. Check whether the content of the image matches the ${category} category; if it does not match, reply only with "True". If the image matches the category, analyze it to determine whether it is AI-generated and reply with only one word: "True" if the image is AI-generated or "False" if it is not. Do not provide explanations, extra text, or confidence levels. Your output must be exactly "True" or "False" only.
    `;

    // 5️⃣ Construct request payload
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
    };

    // 6️⃣ Call Gemini API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Unknown error from API.');
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase();

    if (text === 'true') return true;
    if (text === 'false') return false;

    throw new Error('Unexpected API response.');
  } catch (err: any) {
    console.error(err);
    toast.error(`Failed to analyze image: ${err.message}`);
  }
};
