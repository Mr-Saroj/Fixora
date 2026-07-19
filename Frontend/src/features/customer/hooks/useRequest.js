import { useState, useRef } from 'react';
import { createRequest } from '../services/requestService';
import { uploadPhotosToCloudinary } from '../services/cloudinaryService';

const CATEGORY_MAP = {
    plumbing: 'PLUMBER',
    electrical: 'ELECTRICIAN',
    hvac: 'HVAC',
    carpentry: 'CARPENTER',
    painting: 'PAINTER',
    cleaning: 'CLEANER',
    appliance: 'APPLIANCE_REPAIR',
    other: 'OTHER',
};

const URGENCY_MAP = {
    standard: 'STANDARD',
    emergency: 'EMERGENCY',
};

const initialFormState = {
    fullName: '',
    mobileNumber: '',
    location: '',
    category: '',
    description: '',
    urgency: 'standard',
};

export const useRequest = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [locationStatus, setLocationStatus] = useState('idle'); // idle | fetching | success | error
    const [coordinates, setCoordinates] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const fileInputRef = useRef(null);

    // Handle text/select input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle photo upload
    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newPhotos = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
        }));

        setUploadedPhotos((prev) => [...prev, ...newPhotos]);
        e.target.value = '';
    };

    // Remove a single photo
    const removePhoto = (index) => {
        setUploadedPhotos((prev) => {
            URL.revokeObjectURL(prev[index].preview);
            return prev.filter((_, i) => i !== index);
        });
    };

    // Fetch current location using Geolocation API + OpenStreetMap Nominatim
    const fetchCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationStatus('error');
            return;
        }

        setLocationStatus('fetching');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates({ lat: latitude, lng: longitude });

                const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18`;

                fetch(url, {
                    headers: { 'Accept-Language': 'en' },
                })
                    .then((res) => {
                        if (!res.ok) throw new Error('Nominatim request failed');
                        return res.json();
                    })
                    .then((data) => {
                        const addr = data?.address || {};

                        const localArea =
                            addr.village || addr.hamlet || addr.suburb || addr.neighbourhood || addr.quarter || '';

                        const cityLevel = addr.city || addr.town || addr.municipality || addr.county || '';

                        const parts = [
                            addr.house_number && addr.road ? `${addr.house_number} ${addr.road}` : addr.road,
                            localArea,
                            cityLevel && cityLevel !== localArea ? cityLevel : null,
                            addr.state,
                            addr.postcode,
                        ].filter(Boolean);

                        const address = parts.length > 0 ? parts.join(', ') : (data?.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);

                        setFormData((prev) => ({ ...prev, location: address }));
                        setLocationStatus('success');
                    })
                    .catch(() => {
                        setFormData((prev) => ({
                            ...prev,
                            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
                        }));
                        setLocationStatus('success');
                    });
            },
            (error) => {
                console.error('Geolocation error:', error);
                setLocationStatus('error');
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );
    };

    // Handle form submission — calls backend
const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitError(null);
  setIsSubmitting(true);

  try {
    // 1. Upload photos to Cloudinary first (if any)
    let photoUrls = [];
    if (uploadedPhotos.length > 0) {
      const files = uploadedPhotos.map((p) => p.file);
      photoUrls = await uploadPhotosToCloudinary(files);
    }

    // 2. Build payload with real Cloudinary URLs
    const payload = {
      fullName: formData.fullName,
      mobileNumber: formData.mobileNumber,
      location: formData.location,
      latitude: coordinates?.lat ?? null,
      longitude: coordinates?.lng ?? null,
      category: CATEGORY_MAP[formData.category] || formData.category,
      description: formData.description,
      urgency: URGENCY_MAP[formData.urgency] || formData.urgency,
      photoUrls,
    };

    // 3. Submit request
    const response = await createRequest(payload);
    const data = response.data;

    if (data.success) {
      setFormSubmitted(true);
    } else {
      const message = data.message || 'Failed to submit request.';
      setSubmitError(message);
      alert(message);
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to submit request. Please try again.';
    setSubmitError(message);
    alert(message);
  } finally {
    setIsSubmitting(false);
  }
};

    // Reset form
    const handleReset = () => {
        setFormData(initialFormState);
        setUploadedPhotos([]);
        setCoordinates(null);
        setLocationStatus('idle');
        setFormSubmitted(false);
        setSubmitError(null);
    };

    const viewRequest = () => setFormSubmitted(false);

    return {
        formData,
        setFormData,
        uploadedPhotos,
        locationStatus,
        coordinates,
        formSubmitted,
        isSubmitting,
        submitError,
        fileInputRef,
        handleInputChange,
        handlePhotoUpload,
        removePhoto,
        fetchCurrentLocation,
        handleSubmit,
        handleReset,
        viewRequest,
    };
};