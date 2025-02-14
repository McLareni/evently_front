import { useEffect, useState } from 'react';

import {
  getSelectedTypes,
  getUserCoordinates,
} from '@/redux/filters/selectors';
import { useAppSelector } from '@/redux/hooks';

import { radiusInMeters } from '@/assets/staticData/statickData';
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
      const addressesWithRadius = events.filter(event => {
        const coords = {
          latitude: event.location.latitude ? +event.location.latitude : 0,
          longitude: event.location.longitude ? +event.location.longitude : 0,
        };
        return isPointWithinRadius(coords, userAddress, radiusInMeters);
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
    if (events && !topEventsFilter && !nearbyFilter) {
      const filteredArray = events.filter(item =>
        selectedTypes.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
    // other categories with nearby
    if (events && nearbyFilter && !topEventsFilter) {
      const filteredArray = events.filter(event => {
        if (!selectedTypes.includes(event.type)) {
          return false;
        }
        if (userAddress) {
          const coords = {
            latitude: event.location.latitude ? +event.location.latitude : 0,
            longitude: event.location.longitude ? +event.location.longitude : 0,
          };
          if (!isPointWithinRadius(coords, userAddress, radiusInMeters)) {
            return false;
          }
        }
        return true;
      });
      setFilteredEventsByType(filteredArray);
      return;
    }
    // other categories with top
    if (events && topEventsFilter && !nearbyFilter) {
      const filteredArray = events.filter(
        item =>
          item.category === 'TOP_EVENTS' && selectedTypes.includes(item.type)
      );
      setFilteredEventsByType(filteredArray);
      return;
    }
    // other categories with nearby and top
    if (events && nearbyFilter && topEventsFilter && selectedTypes.length > 2) {
      const filteredArray = events.filter(event => {
        if (event.category !== 'TOP_EVENTS') {
          return false;
        }
        if (!selectedTypes.includes(event.type)) {
          return false;
        }
        if (userAddress) {
          const coords = {
            latitude: event.location.latitude ? +event.location.latitude : 0,
            longitude: event.location.longitude ? +event.location.longitude : 0,
          };
          if (!isPointWithinRadius(coords, userAddress, radiusInMeters)) {
            return false;
          }
        }
        return true;
      });
      setFilteredEventsByType(filteredArray);
      return;
    }
    // nearby and top
    if (
      events &&
      nearbyFilter &&
      topEventsFilter &&
      selectedTypes.length === 2
    ) {
      const filteredArray = events.filter(event => {
        if (event.category !== 'TOP_EVENTS') {
          return false;
        }
        if (userAddress) {
          const coords = {
            latitude: event.location.latitude ? +event.location.latitude : 0,
            longitude: event.location.longitude ? +event.location.longitude : 0,
          };
          if (!isPointWithinRadius(coords, userAddress, radiusInMeters)) {
            return false;
          }
        }
        return true;
      });
      setFilteredEventsByType(filteredArray);
      return;
    }
  }, [
    allEventsFilter,
    events,
    nearbyFilter,
    nearbyFilterOnly,
    selectedTypes,
    topEventsFilter,
    topEventsFilterOnly,
    userAddress,
  ]);

  return { filteredEventsByType };
}
