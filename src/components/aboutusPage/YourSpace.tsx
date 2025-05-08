import YourSpaceSVG from '../../../public/images/YourSpaceSVG.svg'


const YourSpace = () => {
    return (
        <div className='flex gap-20 mb-16'>
            <img src={YourSpaceSVG} alt="Your Space!" />
            <div className='w-[532px]'>
                <h1 className='text-[48px] my-16 text-transparent bg-clip-text bg-gradient-to-r from-[#12C2E9] to-[#C471ED]'>BookMyEvent — твій простір для яскравих подій</h1>
                <p className='text-2xl w-[530px]'>Лекції, майстер-класи, бізнес-зустрічі — тут є все. Зручний і швидкий спосіб купівлі та продажу квитків.</p>
            </div>
        </div>
    )
}


export default YourSpace