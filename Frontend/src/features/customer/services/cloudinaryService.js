import API from "../../../services/api"; // your existing axios instance with JWT interceptor

const uploadUrl = (cloudName) => `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

// Get a fresh signature from backend for this upload
const getUploadSignature = async () => {
  const response = await API.get('/cloudinary/signature');
  return response.data.data; // ✅ unwrap the nested `data` field
};

// Upload a single File using signed params
export const uploadPhotoToCloudinary = async (file) => {
  const { signature, timestamp, apiKey, cloudName } = await getUploadSignature();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  const response = await fetch(uploadUrl(cloudName), {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Cloudinary error:', data);
    throw new Error(data.error?.message || 'Photo upload failed');
  }

  return data.secure_url;
};

// Upload multiple files in parallel
export const uploadPhotosToCloudinary = async (files) => {
  const uploads = files.map((file) => uploadPhotoToCloudinary(file));
  return Promise.all(uploads);
};