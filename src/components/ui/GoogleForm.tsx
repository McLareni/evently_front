/* eslint-disable no-undef */
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { GoogleMapsInput } from './GoogleMapsInput';

export const GoogleForm = () => {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const { handleSubmit } = useForm({ mode: 'onChange' });

  const onSubmit = () => {
    console.log(selectedPlace);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GoogleMapsInput onPlaceSelect={setSelectedPlace} />
      <button type="submit" disabled={!selectedPlace}>
        OK
      </button>
    </form>
  );
};
