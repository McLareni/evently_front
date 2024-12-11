/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const GoogleMapsInput = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const kyivBounds = {
      north: 50.590798,
      south: 50.213273,
      east: 30.825941,
      west: 30.23944,
    };

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
      componentRestrictions: { country: 'ua' },
      bounds: kyivBounds,
      strictBounds: true,
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div>
      <input ref={inputRef} className="w-full h-[52px] px-[15px]" />
    </div>
  );
};
