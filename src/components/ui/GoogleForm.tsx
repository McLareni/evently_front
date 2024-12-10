import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Autocomplete, useLoadScript } from '@react-google-maps/api';

import { GoogleMapsInput } from './GoogleMapsInput';

const libraries = ['places'];

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const GoogleForm = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [fullAddress, setFullAddress] = useState(null);

  const { register, handleSubmit, setValue } = useForm({ mode: 'onChange' });

  const onSubmit = () => {
    console.log(
      fullAddress.address_components,
      'latitude: ',
      fullAddress.geometry.location.lat(),
      'longitude: ',
      fullAddress.geometry.location.lng()
    );
  };
  // console.log(fullAddress);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const address = place.formatted_address;
      setValue('address', address);
      setFullAddress(place);
    }
  };

  const options = {
    componentRestrictions: { country: 'ua' },
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Autocomplete
        onLoad={autocomplete => setAutocomplete(autocomplete)}
        onPlaceChanged={handlePlaceSelect}
        options={options}
      >
        <GoogleMapsInput
          {...register('address', {
            required: "Це обов'язкове поле!",
          })}
          placeholder="Введіть адресу"
          id="address"
          label="Адреса"
          htmlFor="address"
          inputMode="text"
          type="text"
        />
      </Autocomplete>
      <button type="submit">OK</button>
    </form>
  );
};
