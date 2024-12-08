import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';

import { ListEvents } from '@/components/listEvents/ListEvents';
import Spinner from '@/components/ui/Spinner';

const Favourite: React.FC = () => {
  const { data: likedEventsAll, isLoading } = useGetLikedEventsWithSkip();

  if (isLoading) return <Spinner />;

  return (
    <>
      {!likedEventsAll || likedEventsAll.length === 0 ? (
        !isLoading && (
          <span>
            Не знайшов подію, яка цікавить? Чому б не створити власну?
          </span>
        )
      ) : (
        <ListEvents events={likedEventsAll} />
      )}
    </>
  );
};

export default Favourite;
