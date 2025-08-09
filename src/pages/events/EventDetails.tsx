import { useEffect, useState } from 'react';
import { FiFlag } from 'react-icons/fi';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import { selectUser } from '@/redux/auth/selectors';
import {
  useAddLikedEventMutation,
  useDeleteLikedEventMutation,
  useGetAllEventsFilteredQuery,
  useLazyGetEventByIdQuery,
} from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { useGetCountLikeEvent } from '@/hooks/query/useGetCountLikeEvent';
import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import AboutUser from '@/components/eventDetails/AboutUser';
import BackgroundStars from '@/components/eventDetails/BackgroundStars';
import ButtonForSection from '@/components/eventDetails/ButtonForSection';
import CreateBtnSection from '@/components/eventDetails/CreateBtnSection';
import EventTags from '@/components/eventDetails/EventTags';
import HeroSection from '@/components/eventDetails/HeroSection';
import ImageSlider from '@/components/eventDetails/ImageSlider';
import MainInfo from '@/components/eventDetails/MainInfo';
import SectionLayout from '@/components/eventDetails/Mobile/SectionLayout';
import RandomTopEvents from '@/components/eventDetails/RandomTopEvents';
import { MobileSlider } from '@/components/topEvents/MobileSlider';
import { GoogleMap } from '@/components/ui/GoogleMap';
import ShortEventList from '@/components/ui/ShortEventList';
import { ShowAllButton } from '@/components/ui/ShowAllButton';
import Spinner from '@/components/ui/Spinner';

import BuyTicket from '../../components/eventDetails/Mobile/BuyTicket';

const EventTypes: Record<string, string> = {
  'Усі події': 'ALL_EVENTS',
  Інше: 'OTHER',
  'Спортивні заходи': 'SPORTS_EVENTS',
  'Бізнес та нетворкінг': 'BUSINESS_NETWORKING',
  'Майстер класи': 'MASTER_CLASS',
  Концерти: 'CONCERTS',
  'Під домом': 'UNDER_HOUSE',
  'Stand-up': 'STAND_UP',
  Популярні: 'POPULAR',
};

const EventDetails = () => {
  const { idEvent } = useParams();
  const user = useAppSelector(selectUser);
  const { isDesktop, isMobile } = useMediaVariables();
  const city = useAppSelector(state => state.filter.city);
  const [trigger, { data: event, isLoading }] = useLazyGetEventByIdQuery();
  const { data: similarEvents, isFetching } = useGetAllEventsFilteredQuery({
    page: 0,
    size: 4,
    city,
    filter: {
      eventTypes: [EventTypes[event?.type || '']],
    },
  });

  const [isLiked, setIsLiked] = useState(false);
  const { count: countLike, getLike } = useGetCountLikeEvent(idEvent || '');
  const [addLikedEvent] = useAddLikedEventMutation();
  const [deleteLikedEvent] = useDeleteLikedEventMutation();

  const [isShortDesc, setIsShortDesc] = useState(true);
  const [cacheOrganizer, setCacheOrganizer] = useState<User>();

  useEffect(() => {
    async function fetchEvent() {
      const response = await trigger(idEvent || '');
      if (response.status === 'uninitialized') {
        fetchEvent();
      }

      setCacheOrganizer(response.data?.organizers);
    }

    if (idEvent) fetchEvent();
  }, [idEvent, trigger]);

  const toggleIsLiked = async () => {
    if (!isLiked) {
      const addLiked = async () => {
        try {
          if (user.id) {
            await addLikedEvent({
              userId: user.id,
              eventId: event?.id || '',
              event: event || ({} as Event),
            });
            // reloadLike();
            setIsLiked(true);
          } else {
            return toast.error('Щоб зберегти, потрібно залогінитись!');
          }
        } catch (error) {
          console.log(error);
        }
      };
      await addLiked();
    } else {
      const deleteFromLiked = async () => {
        try {
          if (user.id) {
            await deleteLikedEvent({
              userId: user.id,
              eventId: event?.id || '',
            });
            // reloadLike();
            setIsLiked(false);
          }
        } catch (error) {
          console.log(error);
          return error;
        }
      };
      await deleteFromLiked();
    }

    getLike();
  };

  const isLoadingList = [isLoading, isFetching];

  if (isLoadingList.some(Boolean)) {
    return <Spinner />;
  }

  if (!event) {
    return <p>Подія не знайдена</p>;
  }

  const isFullDesc = event.description.length < 100;
  const shortDescUser = event.description?.slice(0, 100);

  const EventDesc = (
    <div>
      <h2 className="lg:text-5xl text-[32px] leading-normal text-textDark lg:mb-8 mb-2">
        Про подію
      </h2>
      <p className="lg:text-[18px] text-sm lg:leading-[27px] leading-normal text-textDark lg:mt-8 mt-2">
        {isShortDesc && !isFullDesc ? `${shortDescUser}...` : event.description}
      </p>
      {!isFullDesc &&
        (isShortDesc ? (
          <ButtonForSection onClick={() => setIsShortDesc(false)}>
            Читати більше
          </ButtonForSection>
        ) : (
          <ButtonForSection onClick={() => setIsShortDesc(true)}>
            Приховати
          </ButtonForSection>
        ))}
    </div>
  );

  const AboutUserWithProps = (
    <AboutUser
      organizer={cacheOrganizer || ({} as User)}
      rating={event.rating}
      aboutUser={event.aboutOrganizer || ''}
    />
  );

  return (
    <main className="lg:px-12 lg:pb-10 p-4 relative">
      {isMobile && <BuyTicket price={event.price} format={event.eventFormat} />}
      {isDesktop && <BackgroundStars />}
      <div className="relative z-10">
        {isDesktop && (
          <HeroSection
            event={event}
            idEvent={idEvent || ''}
            key={JSON.stringify(event)}
          />
        )}
        {isMobile && (
          <div className="w-auto lg:h-[540px] h-[580px] relative mb-6">
            <ImageSlider
              toggleIsLiked={toggleIsLiked}
              countLike={+countLike}
              isLiked={isLiked}
              images={
                event?.images?.length
                  ? [...event.images.map(img => img.url)]
                  : [event.photoUrl || '']
              }
            />
          </div>
        )}
        <div className="lg:px-6 lg:py-12 flex justify-between">
          <div className="lg:w-[868px] w-full">
            {isDesktop ? (
              <>
                {EventDesc}
                {AboutUserWithProps}
              </>
            ) : (
              <div className="flex flex-col gap-6">
                <SectionLayout>
                  <>
                    <EventTags type={event.type} eventUrl={event?.eventUrl} />
                    <h2 className="text-[32px] text-textDark mb-[18px]">
                      {event.title}
                    </h2>
                    <MainInfo event={event} />
                  </>
                </SectionLayout>
                <SectionLayout>{EventDesc}</SectionLayout>
                <SectionLayout>{AboutUserWithProps}</SectionLayout>
              </div>
            )}
            {event.eventFormat === 'OFFLINE' && (
              <div>
                <h2 className="lg:text-5xl text-[32px] text-textDark lg:mt-12 mt-6 mb-2 lg:mb-[50px]">
                  Адреса події
                </h2>
                <p className="lg:mb-8 mb-2 lg:text-[20px] text-sm text-textDark">
                  {event.location.city}, {event.location.street}
                </p>
                <div className="rounded-[20px] overflow-hidden">
                  <GoogleMap events={[event]} />
                </div>
              </div>
            )}
            {isMobile && <CreateBtnSection />}
            <button
              className="flex items-center gap-2 lg:p-3 p-2 lg:mt-8 rounded-[15px] border border-buttonPurple lg:text-xl text-sm
             text-textDark focus:outline-0"
            >
              Поскаржитись на подію <FiFlag className="w-6 h-6 stroke-error" />
            </button>
          </div>
          {isDesktop && <RandomTopEvents idEvent={idEvent || ''} />}
        </div>
        <div>
          {isDesktop && <CreateBtnSection />}
          {isDesktop ? (
            <ShortEventList
              title="Схожі події"
              events={similarEvents || []}
              seeMoreButton={<ShowAllButton style={{ margin: 0 }} />}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] text-textDark mt-6">Схожі події</h2>
              <MobileSlider events={similarEvents} />
              <ShowAllButton />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default EventDetails;
