const Benefits = () => {
  return (
    <div className="mb-6 lg:mb-16">
      <h1 className="pb-4 lg:pb-8 text-[32px] lg:text-[64px] leading-normal">
        Що ви отримуєте з нами?
      </h1>
      <div className="flex flex-row flex-wrap lg:flex-nowrap border-b-2 pb-4 lg:pb-6 mb-4 lg:mb-6 items-center">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] mr-8 lg:mr-[69px] text-[32px] lg:text-[64px] leading-normal">
          01
        </h1>
        <h4 className="w-auto lg:min-w-[382px] mr-[50px] text-xl lg:text-4xl">
          Доставка квитків
        </h4>
        <div>
          <p className="pb-0 lg:pb-4 whitespace-pre-line">
            Ваші квитки будуть доступні відразу після оплати. Ви зможете:
            {'\n\n'}
            Отримати їх на свою електронну пошту. Завантажити у форматі PDF
            прямо з сайту. Якщо подія проходить онлайн, у квитку буде активне
            посилання для доступу.
          </p>
        </div>
        {/* <p className="w-[615px] text-xl">Пишіть опис події, котрий розповідає про суть події, її унікальність, та чим вона може бути правблива для участників</p> */}
      </div>
      <div className="flex flex-row flex-wrap lg:flex-nowrap border-b-2 pb-6 mb-6 items-center">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] mr-8 lg:mr-[66px] text-[32px] lg:text-[64px] leading-normal">
          02
        </h1>
        <h4 className="lg:w-[382px] mr-[50px] text-xl lg:text-4xl ">
          Безпечна оплата
        </h4>
        <div className="w-auto lg:w-[648px]">
          <p className="whitespace-pre-line">
            Ми дбаємо про вашу безпеку, тому всі платежі проходять через
            надійний сервіс WayForPay. Це означає, що:
            {'\n\n'}
            1. Дані вашої картки залишаються конфіденційними.
            {'\n'}
            2. Ніхто з команди, включаючи адміністраторів сайту, не має до них
            доступу.
          </p>
        </div>
        {/* <p className="text-xl w-[648px]">Обирайте якісні фото, фото які будуть відображати атмосферу та тематику події,</p> */}
      </div>
      <div className="flex flex-row flex-wrap lg:flex-nowrap items-center">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B8FF3] to-[#38F6F9] mr-8 lg:mr-[66px] text-[32px] lg:text-[64px] leading-normal">
          03
        </h1>
        <h4 className="lg:w-[382px] mr-[50px] text-xl lg:text-4xl">
          Повернення та підтримка
        </h4>
        <div className="w-auto lg:w-[648px]">
          <p>
            Якщо у вас виникли питання, потрібне повернення квитка або ви хочете
            залишити відгук, ми завжди на зв’язку!
          </p>
          <p>
            Напишіть нам на email або скористайтеся формою на сайті — відповімо
            якнайшвидше.
          </p>
        </div>
        {/* <p className="text-xl">Поділитися подією зі своїми друзями легко</p> */}
      </div>
    </div>
  );
};

export default Benefits;
