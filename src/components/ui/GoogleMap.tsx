import { useCallback, useState } from 'react';

import {
  AdvancedMarker,
  InfoWindow,
  Map,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

interface EventGoogleMapProps {
  event: Event;
}
export const GoogleMap = ({ event }: EventGoogleMapProps) => {
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const { title, location } = event;
  const { city, street, latitude, longitude } = location;

  // TODO
  const lat = +latitude === 0 ? 50.432727 : latitude;
  const lon = +longitude === 0 ? 30.512317 : longitude;

  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown(isShown => !isShown),
    []
  );

  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <Map
      mapId={'1'}
      style={{
        width: '826px',
        height: '600px',
        borderRadius: '20px',
        overflow: 'hidden',
      }}
      defaultCenter={{ lat: +lat, lng: +lon }}
      defaultZoom={11}
      gestureHandling={'cooperative'}
      disableDefaultUI={false}
    >
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: +lat, lng: +lon }}
        clickable={true}
        onClick={handleMarkerClick}
      />
      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          onClose={handleClose}
          headerContent={<h3>{title}</h3>}
        >
          <p>{city}</p>
          <p>{street}</p>
          <p>Україна</p>
          <a
            href={`https://www.google.com/maps?q=${lat},${lon}`}
            target="_blank"
            rel="noreferrer"
            className="text-googlemapsLink font-normal hover:underline"
          >
            <span>Переглянути на Картах Google</span>
          </a>
        </InfoWindow>
      )}
    </Map>
  );
};
