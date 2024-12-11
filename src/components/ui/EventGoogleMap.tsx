import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';

interface EventGoogleMapProps {
  lat: number;
  lng: number;
}
export const EventGoogleMap = ({ lat, lng }: EventGoogleMapProps) => {
  return (
    <Map
      mapId={'1'}
      style={{ width: '600px', height: '400px' }}
      defaultCenter={{ lat, lng }}
      defaultZoom={12}
      gestureHandling={'greedy'}
      disableDefaultUI={false}
    >
      <AdvancedMarker
        position={{ lat, lng }}
        clickable={true}
        onClick={() => alert('Подія')}
      />
    </Map>
  );
};
