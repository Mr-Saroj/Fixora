// src/hooks/useTechnicianProfile.js
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getMyTechnicianProfile,
  completeTechnicianProfile
} from '../services/technicianProfileService';

export const TECHNICIAN_TYPES = [
  'PLUMBER',
  'ELECTRICIAN',
  'CARPENTER',
  'PAINTER',
  'AC_TECHNICIAN',
  'CLEANER',
  'OTHER'
];

export const initialForm = {
  technicianType: '',
  state: '',
  district: '',
  city: '',
  pinCode: '',
  profilePhotoUrl: '',
  govtIdPhotoUrl: ''
};

const mapProfileToForm = (profile) => ({
  technicianType: profile.technicianType || '',
  state: profile.state || '',
  district: profile.district || '',
  city: profile.city || '',
  pinCode: profile.pinCode || '',
  profilePhotoUrl: profile.profilePhotoUrl || '',
  govtIdPhotoUrl: profile.govtIdPhotoUrl || ''
});

const useTechnicianProfile = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getMyTechnicianProfile();
      const profile = response.data?.data;

      if (profile) {
        setForm(mapProfileToForm(profile));
        setProfileExists(true);
        setEditing(false);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        // No profile yet -> open the form directly
        setProfileExists(false);
        setEditing(true);
      } else {
        setError(
          err.response?.data?.message || 'Unable to load your profile.'
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setMessage('');
      setError('');

      if (!/^\d{6}$/.test(form.pinCode)) {
        setError('PIN code must contain exactly 6 digits.');
        return;
      }

      try {
        setSaving(true);

        const response = await completeTechnicianProfile(form);
        setMessage(response.data?.message || 'Profile saved successfully!');

        setProfileExists(true);
        setEditing(false);

        // Refresh saved data through GET API.
        await loadProfile();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to save profile.');
      } finally {
        setSaving(false);
      }
    },
    [form, loadProfile]
  );

  const startEditing = useCallback(() => {
    setMessage('');
    setError('');
    setEditing(true);
  }, []);

  const cancelEditing = useCallback(() => {
    if (profileExists) {
      setError('');
      loadProfile();
      setEditing(false);
    }
  }, [profileExists, loadProfile]);

  const profileComplete = useMemo(
    () => Object.values(form).every(Boolean),
    [form]
  );

  return {
    form,
    loading,
    saving,
    editing,
    profileExists,
    profileComplete,
    message,
    error,
    loadProfile,
    handleChange,
    handleSubmit,
    startEditing,
    cancelEditing
  };
};

export default useTechnicianProfile;