import { useCallback, useState } from 'react';

import {
  AdvancedMarker,
  InfoWindow,
  Map,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

interface EventGoogleMapProps {
  lat: number;
  lng: number;
  about: string;
}
export const GoogleMap = ({ lat, lng, about }: EventGoogleMapProps) => {
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown(isShown => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <Map
      mapId={'1'}
      style={{ width: '826px', height: '600px' }}
      defaultCenter={{ lat, lng }}
      defaultZoom={10}
      gestureHandling={'greedy'}
      disableDefaultUI={false}
    >
      <AdvancedMarker
        ref={markerRef}
        position={{ lat, lng }}
        clickable={true}
        onClick={handleMarkerClick}
      />
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <p>{about}</p>
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noreferrer"
            className="text-googlemapsLink hover:underline"
          >
            Переглянути на Картах Google
          </a>
        </InfoWindow>
      )}
    </Map>
  );
};
