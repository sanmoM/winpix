import * as exifr from 'exifr';
import toast from 'react-hot-toast';


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


const isBlockedImage = async (file: File): Promise<boolean> => {
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
        "DateTimeOriginal",
        "software",
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
export const AIImageDetector = async (
  imageFile: File,
  category: string
): Promise<boolean | undefined> => {
  try {
    // 1️⃣ Convert image to Base64
    const base64Data = await fileToBase64(imageFile);
    const mimeType = imageFile.type;

    // 2️⃣ Gemini API config
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // 3️⃣ Clear, unambiguous prompt
    const prompt = `
You will receive an image.

Step 1:
Determine whether the image matches this category:
"${category}"

If the image does NOT match the category, reply exactly:
MISMATCH

Step 2:
If the image DOES match the category, determine whether it is AI-generated.

Reply with exactly ONE word:
AI     → image is AI-generated
REAL   → image is a real photograph

Do not provide explanations, extra text, or formatting.
Your output must be exactly one of:
MISMATCH, AI, REAL
`;

    // 4️⃣ Request payload
    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
    };

    // 5️⃣ API call
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Gemini API error");
    }

    const result = await response.json();
    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.trim()
        ?.toUpperCase();


    // 6️⃣ Deterministic output handling
    // if (text === "AI") return true;
    // if (text === "MISMATCH") return undefined;
    if (text === "REAL") {
      return false
    } else {
      return true
    }

    // throw new Error("Unexpected Gemini response");
  } catch (err: any) {
    console.error("AIImageDetector error:", err);
    toast.error(`Failed to analyze image: ${err.message}`);
    return undefined;
  }
};

