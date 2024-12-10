/* eslint-disable no-undef */
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Autocomplete, Libraries, useLoadScript } from '@react-google-maps/api';

import { GoogleMapsInput } from './GoogleMapsInput';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries = ['places'] as Libraries;

export const GoogleForm = () => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [fullAddress, setFullAddress] =
    useState<google.maps.places.PlaceResult | null>(null);

  const { register, handleSubmit, setValue } = useForm({ mode: 'onChange' });

  const onSubmit = () => {
    console.log(fullAddress);
  };

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

  const kyivBounds = {
    north: 50.590798,
    south: 50.213273,
    east: 30.825941,
    west: 30.23944,
  };

  const options = {
    componentRestrictions: { country: 'ua' },
    bounds: kyivBounds,
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
      <button type="submit" disabled={!fullAddress}>
        OK
      </button>
    </form>
  );
};
