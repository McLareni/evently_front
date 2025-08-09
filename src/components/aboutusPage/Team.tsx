import Anastasia from '../../../public/images/icons/AnastasiaAV.svg';
import Artem from '../../../public/images/icons/ArtemAV.svg';
import Denys from '../../../public/images/icons/DenysAV.svg';
import Irina from '../../../public/images/icons/IrinaAV.svg';
import Lubomyr from '../../../public/images/icons/LubomyrAV.svg';
import Mykola from '../../../public/images/icons/MykolaAV.svg';
import Tatyana from '../../../public/images/icons/TatyanaAV.svg';
import Vyacheslav from '../../../public/images/icons/VyacheslavAV.svg';
import Yevhen from '../../../public/images/icons/YevhenAV.svg';

const Team = () => {
  return (
    <div className="mb-16">
      <h1 className="pb-8">Команда</h1>
      <div className="text-xl text-center">
        <div className="flex justify-center items-center gap-32 ml-[-10px]">
          <div className="w-60 flex justify-center items-center flex-col ">
            <img src={Vyacheslav} alt="" className="pb-2" />
            <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">
              В'ячеслав
            </p>
            <h2 className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-3 px-[30px]">
              Project manager
            </h2>
          </div>
          <div className="w-60 flex justify-center items-center flex-col ">
            <img src={Anastasia} alt="" className="pb-2" />
            <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">
              Анастасія
            </p>
            <h2 className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-3 px-[30px]">
              UX/UI Designer
            </h2>
          </div>
          <div className="w-60 flex justify-center items-center flex-col ">
            <img src={Tatyana} alt="" className="pb-2" />
            <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">
              Тетяна
            </p>
            <h2 className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-3 px-[30px]">
              UX/UI Designer
            </h2>
          </div>
          <div className="w-60 flex justify-center items-center flex-col ">
            <img src={Lubomyr} alt="" className="pb-2" />
            <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">
              Любомир
            </p>
            <h2 className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-3 px-[30px]">
              Back-end Developer
            </h2>
          </div>
        </div>
        <div className="flex justify-center gap-32">
          <div className="w-60 flex justify-center items-center flex-col ">
            <img src={Denys} alt="" className="pb-2" />
            <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">
              Денис
            </p>
            <h2 className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-3 px-[30px]">
              Front-end Developer
            </h2>
          </div>
          <div className="w-60 flex justify-center items-center flex-col ">
            <img src={Mykola} alt="" className="pb-2" />
            <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">
              Микола
            </p>
            <h2 className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-3 px-[30px]">
              Front-end Developer
            </h2>
          </div>
          <div className="w-60 flex justify-center items-center flex-col ">
            <img src={Yevhen} alt="" className="pb-2" />
            <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">
              Євген
            </p>
            <h2 className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-3 px-[30px]">
              Front-end Developer
            </h2>
          </div>
        </div>
        <div className="flex justify-center gap-32">
          <div className="w-60 flex justify-center items-center flex-col ">
            <img src={Irina} alt="" className="pb-2" />
            <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">
              Ірина
            </p>
            <h2 className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-3 px-[30px]">
              QA engineer
            </h2>
          </div>
          <div className="w-60 flex justify-center items-center flex-col ">
            <img src={Artem} alt="" className="pb-2" />
            <p className="pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">
              Артем
            </p>
            <h2 className="rounded-[10px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] text-background py-3 px-[30px]">
              QA engineer
            </h2>
          </div>
        </div>
        {/* <img src="" alt="" /> */}
      </div>
    </div>
  );
};

export default Team;
