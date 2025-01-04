/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';

import { uk } from 'date-fns/locale';
import dayjs from 'dayjs';

interface CreateEventCalendarProps {
  handleDateChange: (newDate: string) => void;
}

export const CreateEventCalendar = ({
  handleDateChange,
}: CreateEventCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>();

  const formattedDate = dayjs(date).format('YYYY-MM-DD');

  useEffect(() => {
    handleDateChange(formattedDate);
  }, [formattedDate, handleDateChange]);

  return (
    <Calendar
      showMonthAndYearPickers={false}
      onChange={item => setDate(item)}
      locale={uk}
      showDateDisplay={false}
      date={date}
    />
  );
};
