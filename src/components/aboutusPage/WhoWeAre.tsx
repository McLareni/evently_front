import { useState } from 'react';

import { useMediaVariables } from '@/hooks/query/useMediaVariables';
import clsx from 'clsx';

import ButtonForSection from '../eventDetails/ButtonForSection';

const WhoWeAre = () => {
  const [isShortAboutUs, setIsShortAboutUs] = useState(true);
  const { isMobile } = useMediaVariables();

  return (
    <div className="mb-6 lg:mb-16">
      <h1 className="pb-4 lg:pb-8 text-[28px] lg:text-[64px] leading-normal">
        Хто ми?
      </h1>
      <div className="lg:flex lg:gap-20">
        <img
          src="/images/photoZoom.png"
          alt=""
          className="mr-2 lg:mr-0 float-left lg:float-none"
        />
        <div className="">
          <h4 className="pb-2 lg:pb-6 text-base lg:text-4xl font-bold lg:font-normal font-lato">
            Ось більше про нас
          </h4>
          <p
            className={clsx(
              'w-full lg:w-[520px] lg:h-[300px] lg:leading-[25px] leading-[16px] font-normal text-sm lg:text-base whitespace-pre-line',
              isMobile && isShortAboutUs ? 'h-[85px] overflow-clip' : 'h-auto'
            )}
          >
            Ми – команда ентузіастів, які об’єдналися заради спільної ідеї. Усі
            ми – джуни: тестери, розробники, дизайнери та наш проджект-менеджер,
            який і зібрав нас разом. Йому прийшла ідея створити щось справді
            корисне для молоді, і ми всі підхопили цю ідею. Ми помітили, що
            існує безліч платформ для купівлі квитків на масштабні події, але
            немає місця, де будь-хто міг би легко організувати свою подію –
            майстер-клас, стендап чи вебінар. Так народився BookMyEvent –
            платформа, де кожен може не лише знайти цікаві події, а й створити
            власну та почати заробляти. Нам важливо зробити цей процес простим,
            зручним і доступним. Ми віримо, що великі ідеї починаються з малого,
            і, можливо, саме твоя подія стане наступним хітом!
          </p>
          {isMobile && (
            <ButtonForSection
              onClick={() =>
                isShortAboutUs
                  ? setIsShortAboutUs(false)
                  : setIsShortAboutUs(true)
              }
            >
              {isShortAboutUs ? 'Показити більше' : 'Показити менше'}
            </ButtonForSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
