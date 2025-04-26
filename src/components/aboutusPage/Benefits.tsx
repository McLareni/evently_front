

const Benefits = () => {
    return (
        <div className="mb-16">
            <div className="flex border-b-2 pb-6 mb-6 items-center">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] mr-[69px]">01</h1>
              <h4 className="w-[382px] mr-[50px] text-4xl">Доставка квитків</h4>
              <div>
                <p className="pb-4">Ваші квитки будуть доступні відразу після оплати. Ви зможете:</p>
                <p>1. Отримати їх на свою електронну пошту.</p>
                <p>2. Завантажити у форматі PDF прямо з сайту.</p>
                <p>3. Якщо подія проходить онлайн, у квитку буде активне посилання для доступу.</p>
              </div>
              {/* <p className="w-[615px] text-xl">Пишіть опис події, котрий розповідає про суть події, її унікальність, та чим вона може бути правблива для участників</p> */}
            </div>
            <div className="flex border-b-2 pb-6 mb-6 items-center">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] mr-[66px]">02</h1>
              <h4 className="w-[382px] mr-[50px] text-4xl ">Безпечна оплата</h4>
              <div className="w-[648px]">
                <p>Ми дбаємо про вашу безпеку, тому всі платежі проходять через надійний сервіс WayForPay. Це означає, що:</p>
                <p>1. Дані вашої картки залишаються конфіденційними.</p>
                <p>2. Ніхто з команди, включаючи адміністраторів сайту, не має до них доступу.</p>
              </div>
              {/* <p className="text-xl w-[648px]">Обирайте якісні фото, фото які будуть відображати атмосферу та тематику події,</p> */}
            </div>
            <div className="flex items-center">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] mr-[66px]">03</h1>
              <h4 className="w-[382px] mr-[50px] text-4xl">Повернення та підтримка</h4>
              <div className="w-[648px]">
                <p>Якщо у вас виникли питання, потрібне повернення квитка або ви хочете залишити відгук, ми завжди на зв’язку!</p>
                <p>Напишіть нам на email або скористайтеся формою на сайті — відповімо якнайшвидше.</p>
              </div>
              {/* <p className="text-xl">Поділитися подією зі своїми друзями легко</p> */}
            </div>
        </div>
    )
}

export default Benefits