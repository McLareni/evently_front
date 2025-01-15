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
          <span className="text-[64px] font-oswald text-buttonPurple">
            Ви ще нічого не зберегли:(
          </span>
        )
      ) : (
        <ListEvents events={likedEventsAll} />
      )}
    </>
  );
};

export default Favourite;
