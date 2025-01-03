import { useEffect } from 'react';

type AboutEventProps = {
  eventName: string;
  onEventNameChange: (eventName: string) => void;
  onCategoryChange: (category: string) => void;
};

const categories: { name: string }[] = [
  { name: 'Концерт' },
  { name: 'Майстер клас' },
  { name: 'Спортивний захід' },
  { name: 'Stand-up' },
  { name: 'Бізнес та нетворкінг' },
  { name: 'Інше' },
];

const AboutEvent: React.FC<AboutEventProps> = ({
  eventName,
  onEventNameChange,
  onCategoryChange
}) => {

  const handleCategoryClick = (categoryName: string) => {
    onCategoryChange(categoryName); // Передаём выбранную категорию
  };

  useEffect(() => {
    if (eventName === '') {
      onEventNameChange('Назва події');
    }
  }, [eventName, onEventNameChange]);
  
  return (
    <div className="w-[760px] h-[553px] rounded-[20px] border-2 border-buttonPurple flex flex-col py-10 px-10 mb-8">
      <div className="flex flex-col pb-6">
        <label className="pb-3 text-2xl">Назва події</label>
        {/*  bg-gradient-to-br from-[#9B8FF3] to-[#38F6F9] */}
        <input
          type="text"
          className="w-[679px] h-[52px] p-4 border-2 rounded-[10px] border-buttonPurple "
          placeholder="Назви подію так, щоб людям було одразу зрозуміло, про що вона"
          onChange={e => onEventNameChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col pb-[42px]">
        <label htmlFor="" className="pb-4 text-2xl">
          Опис
        </label>
        <textarea
          className="w-[679px] h-[128px] p-4 border-2 rounded-[10px] border-buttonPurple"
          name=""
          id=""
          placeholder="Коротко опиши ідею та концепцію події"
        ></textarea>
      </div>
      <div>
        <div className="flex flex-col">
          <span className="pb-4 text-2xl">Категорія</span>
          <div className="flex break-words w-[669px] h-[112px] flex-wrap">
            {categories.map(category => (
              <div
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className="bg-gradient-to-r hover:from-[#12C2E9] hover:to-[#C471ED] transition ease-in-out duration-700 cursor-pointer flex items-center rounded-[20px] border-[1px] border-borderColor text-xl mr-4 last:pr-0 h-12 px-[18px] 
                                    min-w-[80px] max-w-[223px] from-[#E9E6FF] to-[#D5FEFF]"
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEvent;
