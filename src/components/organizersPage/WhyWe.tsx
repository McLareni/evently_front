

import WhyWeImg from "../../../public/images/WhyWe_businesspeople-meeting-office-working.svg"
import { GiScales } from "react-icons/gi"
import { BiSolidLock } from "react-icons/bi"
import { BsFillPeopleFill } from "react-icons/bs"


const WhyWe = () => {
    return (
    <>
        <div className="mb-16">
            <h1>
                Чому ми?
            </h1>
            <div className="flex">
                <img src={WhyWeImg} alt="" className="mr-[64px]" />
                <div>
                    <div className="flex border-b-2 mb-6 pb-6">
                        <GiScales className="w-12 h-12 mr-7"/>
                        <div className="w-[533px]">
                           <h2 className="pb-4">Безпека та довіра</h2> 
                           <p>Ми офіційна українська ФОП-компанія. Тому твої кошти під захистом, а дохід надходить напряму.</p>
                        </div>
                    </div>
                    <div className="flex border-b-2 mb-6 pb-6">
                        <BsFillPeopleFill className="w-12 h-12 mr-7"/>
                        <div className="w-[533px]">
                           <h2 className="pb-4">Підтримка організаторів</h2> 
                           <p>Ми не кидаємо тебе наодинці з платформою. Служба підримки на зв&apos;язку 24/7, вирішуємо питання швидко і по-людськи.</p>
                        </div>
                    </div>
                    <div className="flex">
                        <BiSolidLock className="w-12 h-12 mr-7"/>
                        <div className="w-[533px]">
                           <h2 className="pb-4">Захист від шахраїв</h2> 
                           <p>Ми перевіряємо організаторів та події для безпеки відвідувачів.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
    )
}

export default WhyWe