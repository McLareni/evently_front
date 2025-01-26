/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import { useCallback, useState } from 'react';

import {
  AdvancedMarker,
  AdvancedMarkerProps,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

interface EventGoogleMapProps {
  events: Event[];
  userLocation?: Coordinates | null;
}
export const GoogleMap = ({ events, userLocation }: EventGoogleMapProps) => {
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  const { location } = events[0];
  const { latitude, longitude } = location;

  // TODO
  const lat = !latitude ? 50.432727 : +latitude;
  const lon = !longitude ? 30.512317 : +longitude;

  const handleInfowindowCloseClick = useCallback(
    () => setInfoWindowShown(false),
    []
  );

  const onMarkerClick = useCallback(
    (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
      setSelectedId(id);

      if (marker) {
        setSelectedMarker(marker);
      }

      if (id !== selectedId) {
        setInfoWindowShown(true);
      } else {
        setInfoWindowShown(isShown => !isShown);
      }
    },
    [selectedId]
  );
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
      {userLocation && (
        <AdvancedMarker
          position={{
            lat: userLocation.latitude,
            lng: userLocation.longitude,
          }}
        >
          <Pin
            background={'#FBBC04'}
            glyphColor={'#000'}
            borderColor={'#000'}
          />
        </AdvancedMarker>
      )}

      {events.map(item => {
        if (!item.location.latitude || !item.location.longitude) {
          return null;
        }

        return (
          <div key={item.id}>
            <AdvancedMarkerWithRef
              key={item.id}
              position={{
                lat: +item.location.latitude,
                lng: +item.location.longitude,
              }}
              clickable={true}
              onMarkerClick={(
                marker: google.maps.marker.AdvancedMarkerElement
              ) => onMarkerClick(item.id, marker)}
            />
            {infoWindowShown && (
              <InfoWindow
                anchor={selectedMarker}
                onCloseClick={handleInfowindowCloseClick}
                headerContent={<h3>{item.title}</h3>}
              >
                <p>{item.location.city}</p>
                <p>{item.location.street}</p>
                <p>Україна</p>
                <a
                  href={`https://www.google.com/maps?q=${item.location.latitude},${item.location.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-googlemapsLink font-normal hover:underline"
                >
                  <span>Переглянути на Картах Google</span>
                </a>
              </InfoWindow>
            )}
          </div>
        );
      })}
    </Map>
  );
};

const AdvancedMarkerWithRef = (
  props: AdvancedMarkerProps & {
    onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void;
  }
) => {
  const { children, onMarkerClick, ...advancedMarkerProps } = props;
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      onClick={() => {
        if (marker) {
          onMarkerClick(marker);
        }
      }}
      ref={markerRef}
      {...advancedMarkerProps}
    >
      {children}
    </AdvancedMarker>
  );
};
