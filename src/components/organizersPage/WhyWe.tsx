

import WhyWeImg from "../../../public/images/WhyWe_businesspeople-meeting-office-working.svg"
import { PiSmiley }  from "react-icons/pi"
import { GiSettingsKnobs } from "react-icons/gi"
import { GiProgression } from "react-icons/gi"


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
                        <PiSmiley className="w-12 h-12 mr-7"/>
                        <div className="w-[533px]">
                           <h2 className="pb-6">Простота і доступність</h2> 
                           <p>Наша платформа інтуїтивно зрозуміла та не потребує спеціальних навичок. Будь-хто може швидко створити та налаштувати свій захід, зосередившись на ідеях, а не на технічних нюансах.</p>
                        </div>
                    </div>
                    <div className="flex border-b-2 mb-6 pb-6">
                        <GiSettingsKnobs className="w-12 h-12 mr-7"/>
                        <div className="w-[533px]">
                           <h2 className="pb-6">Гнучкі можливості налаштування</h2> 
                           <p>Ви отримуєте повний контроль над оформленням та функціоналом заходу. Платформа дозволяє адаптувати кожен аспект під індивідуальні потреби – від дизайну сторінки до інтеграції з соціальними мережами.</p>
                        </div>
                    </div>
                    <div className="flex">
                        <GiProgression className="w-12 h-12 mr-7"/>
                        <div className="w-[533px]">
                           <h2 className="pb-6">Розширені інструменти просування</h2> 
                           <p>Завдяки вбудованим маркетинговим інструментам і можливостям інтеграції з популярними соцмережами, ви можете легко привернути аудиторію та підвищити видимість заходу, що сприяє його успіху.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
    )
}

export default WhyWe