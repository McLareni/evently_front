import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';

interface EventGoogleMapProps {
  lat: number;
  lng: number;
}
export const GoogleMap = ({ lat, lng }: EventGoogleMapProps) => {
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
        position={{ lat, lng }}
        clickable={true}
        onClick={() => alert('Подія')}
      />
    </Map>
  );
};
