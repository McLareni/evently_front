import React from 'react';
import { AiFillStar } from 'react-icons/ai';

import { CardData } from '@/pages/OrganizersPage';

interface CardProps {
  item: CardData;
}

const CommentCard: React.FC<CardProps> = ({ item }) => {
  return (
    <>
      <div className="bg-lightBlue mr-0 lg:mr-6 p-4 lg:p-6 rounded-[20px] h-full flex flex-col justify-between">
        <div>
          <h4 className="text-2xl lg:text-[36px] mb-4">{item.title}</h4>
          <p className="h-24 mb-9 w-full lg:w-[373px]">{item.text}</p>
        </div>
        <div className="pt-3 flex justify-between border-t-2">
          <div>{item.name}</div>
          <div className="flex">
            <AiFillStar className="text-buttonPurple min-w-3 min-h-3 lg:min-w-4 lg:min-h-4" />
            <AiFillStar className="text-buttonPurple min-w-3 min-h-3 lg:min-w-4 lg:min-h-4" />
            <AiFillStar className="text-buttonPurple min-w-3 min-h-3 lg:min-w-4 lg:min-h-4" />
            <AiFillStar className="text-buttonPurple min-w-3 min-h-3 lg:min-w-4 lg:min-h-4" />
            <AiFillStar className="text-buttonPurple min-w-3 min-h-3 lg:min-w-4 lg:min-h-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
