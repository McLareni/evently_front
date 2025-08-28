import React from 'react';

interface IProps {
  teamMember: {
    name: string;
    role: string;
    imgSrc: string;
  };
}

const TeamMemberCard: React.FC<IProps> = ({ teamMember }) => {
  const { name, role, imgSrc } = teamMember;

  return (
    <div className="w-auto lg:w-60 flex justify-center items-center flex-col ">
      <img
        src={imgSrc}
        alt=""
        className="pb-2 w-[60px] lg:w-auto h-[60px] lg:h-auto"
      />
      <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED] font-bold lg:font-normal">
        {name}
      </p>
      <h2
        className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-[4px] lg:py-3 lg:w-[240px] w-[118px] text-center
      text-xs lg:text-xl"
      >
        {role}
      </h2>
    </div>
  );
};

export default TeamMemberCard;
