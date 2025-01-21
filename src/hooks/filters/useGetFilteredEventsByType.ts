import { useEffect, useState } from 'react';

import {
  getSelectedTypes,
  getUserCoordinates,
} from '@/redux/filters/selectors';
import { useAppSelector } from '@/redux/hooks';

import { isPointWithinRadius } from 'geolib';

interface useGetFilteredEventsByTypeProps {
  events: Event[] | undefined;
}

export function useGetFilteredEventsByType({
  events,
}: useGetFilteredEventsByTypeProps) {
  const [filteredEventsByType, setFilteredEventsByType] = useState<Event[]>([]);

  const selectedTypes = useAppSelector(getSelectedTypes);
  const userAddress = useAppSelector(getUserCoordinates);

  const radiusInMeters = 2000;

  const allEventsFilter = selectedTypes.includes('Усі події');

  const nearbyFilterOnly =
    selectedTypes.includes('Під домом') && selectedTypes.length === 1;
  const nearbyFilter = selectedTypes.includes('Під домом');

  const topEventsFilterOnly =
    selectedTypes.includes('Популярні') && selectedTypes.length === 1;
  const topEventsFilter = selectedTypes.includes('Популярні');

  useEffect(() => {
    // only all events
    if (events && allEventsFilter) {
      setFilteredEventsByType(events);
      return;
    }
    // only nearby
    if (events && nearbyFilterOnly && userAddress) {
      const addressesWithRadius = events.filter(address => {
        if (address.location.latitude && address.location.longitude) {
          isPointWithinRadius(address.location, userAddress, radiusInMeters);
        }
      });
      setFilteredEventsByType(addressesWithRadius);
      return;
    }
    // only top events
    if (events && topEventsFilterOnly) {
      const filteredArray = events.filter(
        item => item.category === 'TOP_EVENTS'
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
    // other categories without top and nearby
    if (events && !topEventsFilter) {
      const filteredArray = events.filter(item =>
        selectedTypes.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
    // other categories with top
    if (events && topEventsFilter) {
      const filteredArray = events.filter(
        item =>
          item.category === 'TOP_EVENTS' && selectedTypes.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
  }, [
    allEventsFilter,
    events,
    nearbyFilterOnly,
    selectedTypes,
    topEventsFilter,
    topEventsFilterOnly,
    userAddress,
  ]);

  return { filteredEventsByType };
}
