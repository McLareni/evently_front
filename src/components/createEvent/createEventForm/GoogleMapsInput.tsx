/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface PlaceAutocompleteProps {
  className?: string
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const GoogleMapsInput = ({ className, onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');


  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
      componentRestrictions: { country: 'ua' },
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
      <input
        ref={inputRef}
        className={`w-[245px] h-[52px] p-4 border-2 rounded-[10px] mr-4 ${className}`}
      />
    </div>
  );
};
