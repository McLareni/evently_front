/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { Calendar } from 'bme-calendar';
import 'bme-calendar/style.css';

interface CreateEventCalendarProps {
  handleDateChange: (newDate: string) => void;
  toggleIsCalendarShown: () => void;
}

export const CreateEventCalendar = ({
  handleDateChange,
  toggleIsCalendarShown,
}: CreateEventCalendarProps) => {
  const [day, setDay] = useState<string>();

  useEffect(() => {
    if (day) {
      handleDateChange(day);
      toggleIsCalendarShown();
    }
  }, [day, handleDateChange, toggleIsCalendarShown]);

  return <Calendar setDay={setDay} />;
};
