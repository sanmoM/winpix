import * as exifr from 'exifr';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
/**
 * Main application component for the AI Image Analyzer.
 * Allows users to upload an image and get an analysis from the Gemini API
 * on whether the image is likely AI-generated.
 */
export default function AIGeneratedImageDetector() {
  // State to hold the uploaded image file object
  const [imageFile, setImageFile] = useState(null);
  // State to hold the URL for the image preview
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  // State to hold the analysis result from the API
  const [analysisResult, setAnalysisResult] = useState('');
  // State to manage the loading status
  const [isLoading, setIsLoading] = useState(false);
  // State to hold any error messages
  const [error, setError] = useState(null);

  /**
   * Handles the file input change event.
   * Sets the image file and creates a preview URL.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object from the file input.
   */
  const handleImageChange = async (e) => {
    // toast.error("This image is AI-generated. Please upload a non-AI image.");
    const file = e.target.files[0];
    if (!file) return;
    // const isAI = await isAIGenerated(file);
    // if (isAI) {
    //   console.log(isAI)
    //   return;
    //   setImageFile(file);
    //   // Create a temporary URL for the image preview
    //   setImagePreviewUrl(URL.createObjectURL(file));
    //   // Clear previous results and errors
    //   setAnalysisResult('');
    //   setError(null);
    // }
    if (file) {
      setImageFile(file);
      // Create a temporary URL for the image preview
      setImagePreviewUrl(URL.createObjectURL(file));
      // Clear previous results and errors
      setAnalysisResult('');
      setError(null);
    }
  };

  async function isAIGenerated(file) {
    if (!file) return false;

    try {
      const metadata = await exifr.parse(file, {
        tiff: true,
        ifd0: true,
        exif: true,
        gps: true,
        xmp: true,
      });


      console.log(metadata)

      const aiKeywords = [
        "dall-e",
        "midjourney",
        "stable-diffusion",
        "stable diffusion",
        "photoshop ai",
        "imagen",
        "gemini",
        "google"
      ];

      // 1️⃣ Check Software or CreatorTool for AI keywords
      const software = (metadata?.Software || metadata?.CreatorTool || "").toLowerCase();
      if (aiKeywords.some(k => software.includes(k))) return true;

      // 2️⃣ Missing or suspicious camera info
      const make = metadata?.Make || "";
      const model = metadata?.Model || "";
      if (!make && !model) return true;

      // 3️⃣ Date taken
      const date = metadata?.DateTimeOriginal || metadata?.CreateDate;
      if (!date) return true; // missing date
      const year = new Date(date).getFullYear();
      if (isNaN(year) || year < 2000 || year > new Date().getFullYear()) return true;

      // 4️⃣ Orientation / ExifVersion check
      if (!metadata?.Orientation || !metadata?.ExifVersion) return true;

      // 5️⃣ Optional GPS check
      // if (!metadata?.latitude || !metadata?.longitude) return true;

      // 6️⃣ XMP CreatorTool
      if (metadata?.xmp?.CreatorTool) {
        const creatorTool = metadata.xmp.CreatorTool.toLowerCase();
        if (aiKeywords.some(k => creatorTool.includes(k))) return true;
      }

      // No suspicious metadata found
      return false;
    } catch (err) {
      console.error("Error reading metadata:", err);
      return false;
    }
  }

  /**
   * Converts a File object to a base64 encoded string.
   * @param {File} file - The image file to convert.
   * @returns {Promise<string>} A promise that resolves with the base64 data.
   */
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // The result includes the mime type prefix, so we split it off
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  /**
   * Handles the "Analyze Image" button click.
   * Converts the image to base64, constructs the API request,
   * and fetches the analysis from the Gemini API.
   */
  const handleAnalyzeClick = async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult('');

    try {
      // 1. Convert the image to base64
      const base64Data = await fileToBase64(imageFile);
      const mimeType = imageFile.type;

      // 2. Set up the API call
      // DO NOT add your API key here. The environment will provide it.
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

      // 3. Define the prompt for the model
      const prompt = `
        Analyze the provided image to determine if it is AI-generated.
        Respond with only one word: "True" if it is AI-generated, or "False" if it is not.
        Do not provide any explanation, just the single word "True" or "False".
      `;

      // 4. Construct the request payload
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Data
                }
              }
            ]
          }
        ]
      };

      // 5. Make the API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'An unknown error occurred.');
      }

      const result = await response.json();
      console.log(result)

      // 6. Process the response
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        // We'll trim any whitespace just in case
        setAnalysisResult(text.trim());
      } else {
        throw new Error('No valid analysis found in the API response.');
      }

    } catch (err) {
      console.error(err);
      setError(`Failed to analyze image: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          AI-Generated Image Analyzer
        </h1>

        <p className="text-center text-sm text-gray-600">
          Upload an image to check for signs of AI generation. This tool provides an
          analysis and is not 100% accurate.
        </p>

        {/* File Upload Section */}
        <div>
          <label
            htmlFor="file-upload"
            className="w-full px-4 py-3 text-center text-gray-700 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            {imageFile ? imageFile.name : 'Click to upload an image'}
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleImageChange}
          />
        </div>

        {/* Image Preview Section */}
        {imagePreviewUrl && (
          <div className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50">
            <img
              src={imagePreviewUrl}
              alt="Uploaded preview"
              className="w-full max-h-80 object-contain rounded-md"
            />
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyzeClick}
          disabled={isLoading || !imageFile}
          className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Image'}
        </button>

        {/* Error Display */}
        {error && (
          <div className="p-4 text-center text-red-700 bg-red-100 border border-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* Results Display */}
        {isLoading && (
          <div className="flex justify-center items-center p-6">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {analysisResult && (
          <div className="p-6 space-y-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Result:</h2>
            {/* The output will now be a single word: True or False */}
            <p className="text-gray-700 text-3xl font-bold text-center font-mono">
              {analysisResult}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}