/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';

import { uk } from 'date-fns/locale';
import dayjs from 'dayjs';

interface CreateEventCalendarProps {
  handleDateChange: (newDate: string) => void;
  toggleIsCalendarShown: () => void;
}

export const CreateEventCalendar = ({
  handleDateChange,
  toggleIsCalendarShown,
}: CreateEventCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>();

  const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';

  useEffect(() => {
    if (date) {
      toggleIsCalendarShown();
      handleDateChange(formattedDate);
    }
  }, [date, formattedDate, handleDateChange, toggleIsCalendarShown]);

  return (
    <Calendar
      showMonthAndYearPickers={false}
      onChange={item => setDate(item)}
      locale={uk}
      showDateDisplay={false}
      date={date}
      className="bg-background"
    />
  );
};
