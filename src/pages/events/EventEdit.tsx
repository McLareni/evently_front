import React from 'react';
import { redirect } from 'react-router';

import EventForm from '@/components/events/EventForm';

import { createEvent, editEvent } from '../../utils/eventsHttp';

const EventEdit: React.FC = () => {
  return (
    <>
      <EventForm></EventForm>
    </>
  );
};

export default EventEdit;

export const action = async (request: any, id?: string) => {
  const fd = await request.formData();
  const formData = Object.fromEntries(fd) as eventType;

  if (id === 'new') {
    await createEvent(formData);
    return redirect('/evently_front/events');
  } else {
    await editEvent(formData, id);
    return redirect('/evently_front/events/' + id);
  }
};
