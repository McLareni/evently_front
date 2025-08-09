import { useEffect } from 'react';
import { CgSoftwareDownload } from 'react-icons/cg';

import { usePDF } from '@react-pdf/renderer';

import { Details } from './Details';
import { PDF } from './TicketPDF';

interface Action3Props {
  event: Event | undefined;
}

export const Action3: React.FC<Action3Props> = ({ event }) => {
  const [instance, updateInstance] = usePDF({
    document: undefined,
  });

  useEffect(() => {
    if (event) {
      updateInstance(<PDF event={event} />);
    }
  });
  return (
    <div className="bg-[url('/images/ticket/download-ticket.svg')] bg-cover bg-center w-full h-[340px] px-[100px] py-[36px] flex justify-between">
      <div className="flex flex-col gap-[16px] items-center justify-center">
        <p className="text-[36px]">{event?.title}</p>
        {event?.location.street && (
          <Details
            title="Місце "
            details={`${event?.location.city}, ${event?.location.street}`}
          />
        )}
        {event?.eventUrl && (
          <Details title="Посилання " details={event?.eventUrl} />
        )}
        <div className="flex gap-[64px]">
          <Details
            title="Час"
            details={`${event?.date.time} - ${event?.date.endTime}`}
          />
          <Details title="Дата" details={event?.date.day} />
        </div>
      </div>

      <div>
        <img
          className="h-[200px] w-[200px] object-cover rounded-[10px] mb-[32px]"
          src={event?.images[0].url}
          alt="event image"
        />
        {event && instance.url && (
          <a
            href={instance.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            <span>Скачати PDF</span>
            <CgSoftwareDownload size={32} />
          </a>
        )}
      </div>
    </div>
  );
};
