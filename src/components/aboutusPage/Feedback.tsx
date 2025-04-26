import { SharedBtn } from "../ui"

const Feedback = () => {
    return (
        <div className="mx-[108px] mb-24">
            <div className="flex flex-col justify-center items-center rounded-[20px] h-[687px] bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9]">
                <h4 className="text-4xl text-center w-[541px] pb-8">
                Знайшли баг чи маєте пропозицію? 
                Напишіть нам – ми цінуємо ваш фідбек!
                </h4>
                <div>
                    <h2 className="pb-5">Введіть ваш email</h2>
                    <input type="text" className="mb-4 w-[830px] h-16 py-5 pl-6 rounded-[20px] border-2 border-buttonPurple focus:outline-none transition-all duration-200 ease-in-out
                outline-none" placeholder="Ваш email"/>
                    <div className="flex flex-col items-start">
                        <h2 className="pb-5">Опишіть проблему або додайте фото</h2>
                        <textarea
                            className="px-6 py-5 min-w-[830px] min-h-[245px] rounded-[20px] border-2 border-buttonPurple focus:outline-none transition-all duration-200 ease-in-out"
                            placeholder="Опиши проблеми"
                        />
                        <SharedBtn type="button" primary={true} className="mt-6 w-[230px] h-12">
                            Відправити
                        </SharedBtn>
                    </div>
                </div>                    
            </div>
        </div>
    )
}

export default Feedback