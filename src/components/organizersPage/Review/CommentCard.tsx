import React from "react"
import { AiFillStar } from "react-icons/ai"

import { CardData } from "@/pages/OrganizersPage";

interface CardProps {
  item: CardData;
}

const CommentCard: React.FC<CardProps> = ({item}) => {
    return (
        <>
            <div className="bg-lightBlue mr-6 p-6 rounded-[20px]">
                <h4 className="text-[36px] mb-4">{item.title}</h4>
                <p className="h-24 mb-9 w-[373px]">{item.text}</p>
                <div className="pt-3 flex justify-between border-t-2">
                    <div>{item.name}</div>
                    <div className="flex">
                        <AiFillStar className="text-buttonPurple"/>
                        <AiFillStar className="text-buttonPurple"/>
                        <AiFillStar className="text-buttonPurple"/>
                        <AiFillStar className="text-buttonPurple"/>
                        <AiFillStar className="text-buttonPurple"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommentCard