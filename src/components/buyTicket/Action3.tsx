import { useEffect } from 'react';
import { CgSoftwareDownload } from 'react-icons/cg';

import { usePDF } from '@react-pdf/renderer';

import { Details } from './Details';
import { PDF } from './TicketPDF';

interface Action3Props {
  ticket: Ticket;
}

export const Action3: React.FC<Action3Props> = ({ ticket }) => {
  const [instance, updateInstance] = usePDF({
    document: undefined,
  });

  useEffect(() => {
    if (ticket) {
      updateInstance(<PDF ticket={ticket} />);
    }
  });

  return (
    <div className="bg-[url('/images/ticket/download-ticket.svg')] bg-cover bg-center w-full h-[340px] px-[100px] py-[36px] flex justify-between">
      <div className="flex flex-col gap-[16px] items-center justify-center">
        <p className="text-[36px]">{ticket?.event.title}</p>
        {ticket.event?.location.street && (
          <Details
            title="Місце "
            details={`${ticket.event.location.city}, ${ticket.event.location.street}`}
          />
        )}
        {ticket.event?.eventUrl && (
          <Details title="Посилання " details={ticket.event?.eventUrl} />
        )}
        <div className="flex gap-[64px]">
          <Details
            title="Час"
            details={`${ticket.event?.date.time} - ${ticket.event?.date.endTime}`}
          />
          <Details title="Дата" details={ticket.event?.date.day} />
        </div>
      </div>

      <div>
        <img
          className="h-[200px] w-[200px] object-cover rounded-[10px] mb-[32px]"
          src={ticket.event?.images[0].url}
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
