/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import { HTMLProps, useEffect, useRef, useState } from 'react';

import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface PlaceAutocompleteProps extends HTMLProps<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export const GoogleMapsInput = ({
  className,
  placeholder,
  onPlaceSelect,
  ...props
}: PlaceAutocompleteProps) => {
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
    <input
      {...props}
      placeholder={placeholder}
      name="place"
      ref={inputRef}
      className={`p-4 ${className}`}
    />
  );
};
