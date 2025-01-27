import { useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  addSelectedTypes,
  removeNearby,
  setIsNearbyFromHeader,
  setUserCoordinates,
} from '@/redux/filters/filtersSlice';
import {
  getIsNearbyFromHeader,
  getSelectedTypes,
  getUserCoordinates,
} from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export function useGetEventTypeFilter() {
  const dispatch = useAppDispatch();

  const selectedTypes = useAppSelector(getSelectedTypes);
  const isNearbyFromHeader = useAppSelector(getIsNearbyFromHeader);
  const userAddress = useAppSelector(getUserCoordinates);

  const addTypeFilter = (filter: string) => {
    if (!selectedTypes.includes(filter)) {
      dispatch(addSelectedTypes([...selectedTypes, filter]));
    }
    if (selectedTypes.includes(filter)) {
      if (selectedTypes.length === 1 && filter === 'Усі події') return;

      const newArray = selectedTypes.filter(item => item !== filter);
      dispatch(addSelectedTypes(newArray));
    }
    if (selectedTypes[0] === 'Усі події' && filter !== 'Усі події') {
      dispatch(addSelectedTypes([filter]));
    }
    if (filter === 'Усі події') {
      dispatch(addSelectedTypes(['Усі події']));
    }
  };

  useEffect(() => {
    const getMyPosition = () =>
      navigator.geolocation.getCurrentPosition(
        position => {
          // TODO
          // const coordinates = {
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          // };
          const coordinates = { latitude: 50.43749, longitude: 30.514977 };
          console.log('Адреса юзера: Антоновича 42, Київ; радіус 2 км');
          toast.success('Місцезнаходження виявлено');
          dispatch(setUserCoordinates(coordinates));
        },
        error => {
          console.log(error);
          if (error.code === 1) {
            console.log(window.location);
            toast.error('Ввімкніть доступ до місцезнаходження!');
            dispatch(removeNearby());
          }
        }
      );

    if (
      selectedTypes.includes('Під домом') &&
      !isNearbyFromHeader &&
      !userAddress
    ) {
      getMyPosition();
    }
    if (selectedTypes.includes('Під домом') && isNearbyFromHeader) {
      dispatch(setIsNearbyFromHeader(false));
      getMyPosition();
    }
  }, [dispatch, isNearbyFromHeader, selectedTypes, userAddress]);
  console.log(isNearbyFromHeader);

  useEffect(() => {
    if (selectedTypes.length === 0) {
      dispatch(addSelectedTypes(['Усі події']));
    }
  }, [selectedTypes, dispatch]);

  useEffect(() => {
    if (selectedTypes.length > 0 && !selectedTypes.includes('Усі події')) {
      dispatch(addSelectedTypes(selectedTypes));
    }
  }, [selectedTypes, dispatch]);

  return { addTypeFilter };
}
