
import eventPhotoForm from "../../../public/images/EventPhotoForm.svg"
import eventPhoto from "../../../public/images/EventPhoto.svg"
import profileEvents from "../../../public/images/ProfileEnents.svg"
import arrow from "../../../public/images/Arrow.svg"



const WhyBookMyEvent = () => {
    return (
        <>
            <div className="mb-16">
                <h1 className="m-auto pb-8 text-center">Чому BookMyEvent?</h1>
                <div className="flex text-center">
                    <div className="w-[349px] mr-[33px]">
                        <p className="pb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-[32px]">Створюй події за кілька кліків</p>
                        <img src={eventPhotoForm} alt="" />
                    </div>
                    <img src={arrow} alt="" className="mr-4 h-[229px] mt-[170px]"/>
                    <div className="w-[450px] mr-[14px]">
                        <p className="pb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-[32px]">Все прозоро - без прихованих комісій</p>
                        <img src={eventPhoto} alt="" className="m-auto"/>
                    </div>
                    <img src={arrow} alt="" className="mr-4 h-[229px] mt-[170px]" />
                    <div className="w-[349px]">
                        <p className="w-[312px] m-auto pb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED] text-[32px]">Контролюй продажі та заробляй</p>
                        <img src={profileEvents} alt="" className=""/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhyBookMyEvent