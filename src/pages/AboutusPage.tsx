import { Container } from "@/components/container/Container"

import YourSpace from "@/components/aboutusPage/YourSpace"
import WhoWeAre from "@/components/aboutusPage/WhoWeAre"
import { FAQ } from "@/components/faq/FAQ"
import Team from "@/components/aboutusPage/Team"
import Benefits from "@/components/aboutusPage/Benefits"
import Feedback from "@/components/aboutusPage/Feedback"



const AboutusPage = () => {
    return (
        <Container>
            <YourSpace/>
            <WhoWeAre/>
            <Team/>
            <Feedback/>
            <Benefits/>
            <FAQ/>
        </Container>
    )
}


export default AboutusPage