import { useState } from 'react';
import { Calendar } from 'react-date-range';

import { uk } from 'date-fns/locale';

export const CreateEventCalendar = () => {
  const [date, setDate] = useState(new Date());

  console.log(date);

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
