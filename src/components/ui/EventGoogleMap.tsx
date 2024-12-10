import {
  APIProvider,
  AdvancedMarker,
  Map,
  Marker,
} from '@vis.gl/react-google-maps';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface EventGoogleMapProps {
  lat: number;
  lng: number;
}
export const EventGoogleMap = ({ lat, lng }: EventGoogleMapProps) => {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={'1'}
        style={{ width: '600px', height: '400px' }}
        defaultCenter={{ lat, lng }}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <AdvancedMarker position={{ lat, lng }} clickable={true} />
      </Map>
    </APIProvider>
  );
};
