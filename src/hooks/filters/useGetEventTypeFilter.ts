import { useEffect } from 'react';

import {
  addSelectedTypes,
} from '@/redux/filters/filtersSlice';
import {
  getSelectedTypes,
} from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export function useGetEventTypeFilter() {
  const dispatch = useAppDispatch();

  const selectedTypes = useAppSelector(getSelectedTypes);

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
