import { CgSoftwareDownload } from 'react-icons/cg';

import { Details } from './Details';

interface Action3Props {
  event: Event | undefined;
}

export const Action3: React.FC<Action3Props> = ({ event }) => {
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
        <button className="flex gap-[6px] items-center focus:outline-none mx-auto">
          <span>Скачати PDF </span>
          <CgSoftwareDownload size={32} />
        </button>
      </div>
    </div>
  );
};
