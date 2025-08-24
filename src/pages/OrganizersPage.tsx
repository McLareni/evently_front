import { Container } from "@/components/container/Container"
import { FAQ } from "@/components/faq/FAQ"
import Reviews from "@/components/organizersPage/Review/Reviews"
import Tips from "@/components/organizersPage/Tips"
import WhyBookMyEvent from "@/components/organizersPage/WhyBookMyEvent"
import WhyWe from "@/components/organizersPage/WhyWe"
import YourEvent from "@/components/organizersPage/YourEvent"

export interface CardData {
    title: string;
    text: string;
    name: string;
  }
  



const OrganizersPage = () => { 
    const data: CardData[] = [
        {
            title: "Ідеальна платформа для створення подій",
            text: "Ця платформа значно полегшила мою роботу як організатора. Створення подій – інтуїтивне та швидке. А можливість просування подій через соцмережі – справжня знахідка. Рекомендую!",
            name: "Емілія" 
         },
        {
            title: "Чудова підтримка і зручність роботи",
            text: "Я не технічна людина, але платформа надзвичайно проста. Зустрів технічну проблему – написав у службу підтримки й отримав відповідь буквально за кілька хвилин.",
            name: "Софія" 
        },
        {
            title: "Можливості для кастомізації – на висоті!",
            text: "Я оцінив можливість налаштовувати всі деталі події: від оформлення сторінки до інтеграції платіжних систем. Це ідеально підходить для будь-яких форматів – від конференцій до камерних зустрічей",
            name: "Андрій" 
        },
        {
            title: "Ідеальна платформа для створення подій",
            text: "Ця платформа значно полегшила мою роботу як організатора. Створення подій – інтуїтивне та швидке. А можливість просування подій через соцмережі – справжня знахідка. Рекомендую!",
            name: "Емілія" 
        },
    ]
      
    return (
        <>
            <Container>
                <YourEvent/>
                <WhyBookMyEvent/>
                <Tips/>
                <WhyWe/>
                <Reviews data={data}/>
                <div className="flex flex-col">
                    <h1 className="w-[89px] lg:leading-[94.85px] leading-normal text-[28px] lg:text-[64px] lg:mr-[20px] mb-4 lg:mb-8">
                        FAQ
                    </h1>
                    <div className="flex justify-center">
                        <FAQ hideTitle={true} noTopMargin={true} noContainerTopMargin={true} />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default OrganizersPage