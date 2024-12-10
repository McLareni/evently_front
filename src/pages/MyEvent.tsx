import { toast } from 'react-toastify';

import { eventsGPS } from '@/assets/fakeData/eventsGPS';
import { isPointWithinRadius } from 'geolib';

import { ListEvents } from '@/components/listEvents/ListEvents';
import { GoogleForm } from '@/components/ui/GoogleForm';

const MyEvent = () => {
  // console.log(eventsGPS);

  // вулиця Зоряна, 8, Київ, Україна, 02000
  const defaultAddress = { latitude: 50.489775, longitude: 30.436815 };

  const radiusInMeters = 11000;

  const addressesWithinRadius = eventsGPS.filter(address =>
    isPointWithinRadius(address.location, defaultAddress, radiusInMeters)
  );

  // console.log('Під домом:', addressesWithinRadius);

  const getMyPosition = () =>
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords);
        return position.coords;
      },
      error => {
        console.log(error);
        if (error.code === 1) {
          console.log(window.location);
          toast.error('Ввімкніть доступ до місцезнаходження!');
        }
      }
    );

  return (
    <>
      <GoogleForm />
      <button style={{ border: '1px solid tomato' }} onClick={getMyPosition}>
        Поділитись гео
      </button>
      <p>Події під домом вулиця Зоряна, 8</p>
      <ListEvents events={addressesWithinRadius} />
    </>
  );
};

export default MyEvent;
