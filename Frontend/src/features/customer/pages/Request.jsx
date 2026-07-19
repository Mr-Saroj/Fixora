import React from 'react';
import RequestForm from '../components/RequestForm';
import RequestSuccess from '../components/RequestSuccess';
import { useRequest } from '../hooks/useRequest';

const Request = () => {
  const {
    formData,
    setFormData,
    uploadedPhotos,
    locationStatus,
    coordinates,
    formSubmitted,
    isSubmitting,
    fileInputRef,
    handleInputChange,
    handlePhotoUpload,
    removePhoto,
    fetchCurrentLocation,
    handleSubmit,
    handleReset,
    viewRequest,
  } = useRequest();

  if (formSubmitted) {
    return (
      <RequestSuccess
        formData={formData}
        uploadedPhotos={uploadedPhotos}
        coordinates={coordinates}
        handleReset={handleReset}
        viewRequest={viewRequest}
      />
    );
  }

  return (
    <RequestForm
      formData={formData}
      handleInputChange={handleInputChange}
      setFormData={setFormData}
      uploadedPhotos={uploadedPhotos}
      locationStatus={locationStatus}
      coordinates={coordinates}
      fileInputRef={fileInputRef}
      fetchCurrentLocation={fetchCurrentLocation}
      handlePhotoUpload={handlePhotoUpload}
      removePhoto={removePhoto}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      isSubmitting={isSubmitting}
    />
  );
};

export default Request;