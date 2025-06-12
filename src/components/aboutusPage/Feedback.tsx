import { useState } from "react"
import { SharedBtn } from "../ui"
import { sendFeedback } from "@/api/sendFeedback"

const Feedback = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const response = await sendFeedback(email, message)
            console.log("Feedback response:", response)
            setEmail("")
            setMessage("")
        } catch (error) {
            console.error("Error submitting feedback:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mx-[108px] mb-24 relative">
            <div className="inset-0 bg-bg-gradient rounded-[20px]">
            <div className="flex flex-col justify-center items-center h-[687px] inset-0 bg-backgroundImage rounded-[20px]">
                <h4 className="text-4xl text-center w-[541px] pb-8">
                Знайшли баг чи маєте пропозицію? 
                Напишіть нам – ми цінуємо ваш фідбек!
                </h4>
                <div>
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 w-[830px] h-16 py-5 pl-6 rounded-[20px] border-2 border-buttonPurple focus:outline-none transition-all duration-200 ease-in-out outline-none" 
                        placeholder="Введіть ваш email"
                    />
                    <div className="flex flex-col items-center">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="px-6 py-5 min-w-[830px] min-h-[245px] rounded-[20px] border-2 border-buttonPurple focus:outline-none transition-all duration-200 ease-in-out"
                            placeholder="Опишіть проблему або додайте фото"
                        />
                        <SharedBtn 
                            type="button" 
                            primary={true} 
                            className="mt-6 w-[230px] h-12"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Відправляємо..." : "Відправити"}
                        </SharedBtn>
                    </div>
                </div>                    
            </div>
            </div>
        </div>
    )
}

export default Feedback