import { useMediaVariables } from '@/hooks/query/useMediaVariables';

import Anastasia from '../../../public/images/icons/AnastasiaAV.svg';
import Artem from '../../../public/images/icons/ArtemAV.svg';
import Denys from '../../../public/images/icons/DenysAV.svg';
import Irina from '../../../public/images/icons/IrinaAV.svg';
import Lubomyr from '../../../public/images/icons/LubomyrAV.svg';
import Mykola from '../../../public/images/icons/MykolaAV.svg';
import Tatyana from '../../../public/images/icons/TatyanaAV.svg';
import Vyacheslav from '../../../public/images/icons/VyacheslavAV.svg';
import Yevhen from '../../../public/images/icons/YevhenAV.svg';
import TeamMemberCard from './TeamMemberCard';

const TEAM = {
  Vyacheslav: {
    role: 'Project manager',
    name: "В'ячеслав",
    imgSrc: Vyacheslav,
  },
  Anastasia: {
    role: 'UX/UI Designer',
    name: 'Анастасія',
    imgSrc: Anastasia,
  },
  Tatyana: {
    role: 'UX/UI Designer',
    name: 'Тетяна',
    imgSrc: Tatyana,
  },
  Lubomyr: {
    role: 'Back-end Developer',
    name: 'Любомир',
    imgSrc: Lubomyr,
  },
  Denys: {
    role: 'Front-end Developer',
    name: 'Денис',
    imgSrc: Denys,
  },
  Mykola: {
    role: 'Front-end Developer',
    name: 'Микола',
    imgSrc: Mykola,
  },
  Yevhen: {
    role: 'Front-end Developer',
    name: 'Євген',
    imgSrc: Yevhen,
  },
  Irina: {
    role: 'QA engineer',
    name: 'Ірина',
    imgSrc: Irina,
  },
  Artem: {
    role: 'QA engineer',
    name: 'Артем',
    imgSrc: Artem,
  },
};

const Team = () => {
  const { isMobile } = useMediaVariables();

  return (
    <div className="mb-8 lg:mb-16">
      <h1 className="pb-4 lg:pb-8 text-[28px] lg:text-[64px] leading-normal">
        Команда
      </h1>
      {isMobile ? (
        <div className="flex gap-[2px]">
          <div className="flex flex-col gap-4">
            <TeamMemberCard teamMember={TEAM.Vyacheslav} />
            <TeamMemberCard teamMember={TEAM.Denys} />
            <TeamMemberCard teamMember={TEAM.Lubomyr} />
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <TeamMemberCard teamMember={TEAM.Anastasia} />
            <TeamMemberCard teamMember={TEAM.Mykola} />
            <TeamMemberCard teamMember={TEAM.Irina} />
          </div>
          <div className="flex flex-col gap-4">
            <TeamMemberCard teamMember={TEAM.Tatyana} />
            <TeamMemberCard teamMember={TEAM.Yevhen} />
            <TeamMemberCard teamMember={TEAM.Artem} />
          </div>
        </div>
      ) : (
        <div className="text-xl text-center">
          <div className="flex justify-center items-center gap-[120px] ml-[-10px]">
            <TeamMemberCard teamMember={TEAM.Vyacheslav} />
            <TeamMemberCard teamMember={TEAM.Anastasia} />
            <TeamMemberCard teamMember={TEAM.Tatyana} />
            <TeamMemberCard teamMember={TEAM.Lubomyr} />
          </div>
          <div className="flex justify-center gap-32">
            <TeamMemberCard teamMember={TEAM.Denys} />
            <TeamMemberCard teamMember={TEAM.Mykola} />
            <TeamMemberCard teamMember={TEAM.Yevhen} />
          </div>
          <div className="flex justify-center gap-32">
            <TeamMemberCard teamMember={TEAM.Irina} />
            <TeamMemberCard teamMember={TEAM.Artem} />
          </div>
          {/* <img src="" alt="" /> */}
        </div>
      )}
    </div>
  );
};

export default Team;
