import { Container } from "@/components/container/Container"
import { SharedBtn } from "@/components/ui"




const OrganizersPage = () => {
    
    return (
        <>
            <Container>
                <div>
                    <div>
                        <h1>Твій івент — твої можливості</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos dolorem nam repellat quas, incidunt repellendus officia nulla placeat perspiciatis numquam maiores, recusandae sed eum illo eaque enim cupiditate quasi aspernatur.</p>
                        <SharedBtn 
                            type="button" 
                            primary
                            className="w-[312px] h-6"
                            >
                                Створити подію
                        </SharedBtn>
                    </div>
                    <div></div>
                </div>
            </Container>
        </>
    )
}

export default OrganizersPage