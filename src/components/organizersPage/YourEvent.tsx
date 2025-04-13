import { SharedBtn } from "../ui/SharedBtn"
import  image  from '../../../public/images/YourEvent_image.svg'

const YourEvent = () => {
    return (
        <>
        <div className="flex mb-16">
               <div className="max-w-[563px] mr-[109px] pt-[162px]">
                    <h1 className="pb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]">Твій івент — твої можливості</h1>
                    <p className="pb-6 text-xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos dolorem nam repellat quas, incidunt repellendus officia nulla placeat perspiciatis numquam maiores, recusandae sed eum illo eaque enim cupiditate quasi aspernatur.</p>
                    <SharedBtn 
                        type="button" 
                        primary
                        className="w-[312px] h-12"
                        >
                            Створити подію
                    </SharedBtn>
                </div>
                <div>
                    <img src={image} alt="" />
                </div>
        </div>
        </>
    )
}


export default YourEvent