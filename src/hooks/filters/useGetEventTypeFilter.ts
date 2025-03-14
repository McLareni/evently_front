import { useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  addSelectedTypes,
  removeNearby,
  setUserCoordinates,
} from '@/redux/filters/filtersSlice';
import {
  getSelectedTypes,
  getUserCoordinates,
} from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export function useGetEventTypeFilter() {
  const dispatch = useAppDispatch();

  const selectedTypes = useAppSelector(getSelectedTypes);
  const userAddress = useAppSelector(getUserCoordinates);

  const addTypeFilter = (filter: string) => {
    if (!selectedTypes.includes(filter)) {
      dispatch(addSelectedTypes([...selectedTypes, filter]));
    }
    if (selectedTypes.includes(filter)) {
      if (selectedTypes.length === 1 && filter === 'ALL_EVENTS') return;

      const newArray = selectedTypes.filter(item => item !== filter);
      dispatch(addSelectedTypes(newArray));
    }
    if (selectedTypes[0] === 'ALL_EVENTS' && filter !== 'ALL_EVENTS') {
      dispatch(addSelectedTypes([filter]));
    }
    if (filter === 'ALL_EVENTS') {
      dispatch(addSelectedTypes(['ALL_EVENTS']));
    }
  };

  useEffect(() => {
    const getMyPosition = () =>
      navigator.geolocation.getCurrentPosition(
        position => {
          // TODO
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          // const coordinates = { latitude: 50.43749, longitude: 30.514977 };
          console.log('Адреса юзера: Антоновича 42, Київ; радіус 2 км');
          toast.success('Місцезнаходження виявлено');
          dispatch(addSelectedTypes([...selectedTypes, 'UNDER_HOUSE']));
          dispatch(
            setUserCoordinates({
              latitude: coordinates.latitude && 50.43749,
              longitude: coordinates.longitude && 30.514977,
            })
          );
        },
        error => {
          console.log(error);
          if (error.code === 1) {
            console.log(window.location);
            toast.error('Ввімкніть доступ до місцезнаходження!');
            dispatch(removeNearby());
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );

    if (selectedTypes.includes('UNDER_HOUSE') && !userAddress?.latitude) {
      getMyPosition();
    }
  }, [dispatch, selectedTypes, userAddress]);

  useEffect(() => {
    if (selectedTypes.length === 0) {
      dispatch(addSelectedTypes(['ALL_EVENTS']));
    }
  }, [selectedTypes, dispatch]);

  useEffect(() => {
    if (selectedTypes.length > 0 && !selectedTypes.includes('ALL_EVENTS')) {
      dispatch(addSelectedTypes(selectedTypes));
    }
  }, [selectedTypes, dispatch]);

  return { addTypeFilter };
}
