import { useEffect, useState } from 'react';

import { addRangeDatesArray } from '@/redux/filters/filtersSlice';
import { useAppDispatch } from '@/redux/hooks';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import { Calendar } from 'bme-calendar';
import 'bme-calendar/style.css';

interface DateRangeProps {
  isShownCalendar: boolean;
}

export function DateRange({ isShownCalendar }: DateRangeProps) {
  const [range, setRange] = useState<string[]>();

  const dispatch = useAppDispatch();

  const width = useScreenWidth();

  useEffect(() => {
    if (isShownCalendar && range) {
      dispatch(addRangeDatesArray(range));
    } else {
      dispatch(addRangeDatesArray([]));
    }
  }, [dispatch, isShownCalendar, range]);

  return (
    <div
      style={{
        height: isShownCalendar ? 'auto' : '0',
      }}
    >
      <Calendar
        type="range"
        setRange={setRange}
        range={range}
        daySize={width >= 1024 ? 'desktop' : 'mobile'}
      />
    </div>
  );
}
