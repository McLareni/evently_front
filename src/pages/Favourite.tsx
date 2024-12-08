import { eventsGPS } from '@/assets/fakeData/eventsGPS';
import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';
import { isPointWithinRadius } from 'geolib';

import { ListEvents } from '@/components/listEvents/ListEvents';
import Spinner from '@/components/ui/Spinner';

const Favourite: React.FC = () => {
  const { data: likedEventsAll, isLoading } = useGetLikedEventsWithSkip();

  if (isLoading) return <Spinner />;

  console.log(eventsGPS);

  // вулиця Зоряна, 8, Київ, Україна, 02000
  const defaultAddress = { latitude: 50.489775, longitude: 30.436815 };

  const radiusInMeters = 50;

  const addressesWithinRadius = eventsGPS.filter(address =>
    isPointWithinRadius(address.location, defaultAddress, radiusInMeters)
  );

  console.log('Nearby:', addressesWithinRadius);

  return (
    <>
      {!likedEventsAll || likedEventsAll.length === 0 ? (
        !isLoading && (
          <span>
            Не знайшов подію, яка цікавить? Чому б не створити власну?
          </span>
        )
      ) : (
        <ListEvents events={likedEventsAll} />
      )}
    </>
  );
};

export default Favourite;
