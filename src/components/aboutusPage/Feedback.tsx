import { useState } from 'react';

import { sendFeedback } from '@/api/sendFeedback';

import { SharedBtn } from '../ui';

const Feedback = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await sendFeedback(email, message);
      console.log('Feedback response:', response);
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="mx-0 lg:mx-[108px] mb-6 lg:mb-[64px] relative">
      <div className="inset-0 bg-bg-gradient rounded-[20px]">
        <div className="flex flex-col justify-center items-center lg:h-[687px] inset-0 p-4 lg:p-0 bg-backgroundImage rounded-[20px]">
          <h4 className="text-base lg:text-4xl text-center w-[265px] lg:w-[541px] pb-8 font-medium lg:font-normal">
            Знайшли баг чи маєте пропозицію? Напишіть нам – ми цінуємо ваш
            фідбек!
          </h4>
          <div className="w-full lg:w-auto">
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mb-4 text-sm lg:text-base leading-none w-full lg:w-[830px] lg:h-16 py-3 lg:py-5 px-4 lg:px-6 rounded-[10px] border-2 border-buttonPurple focus:outline-none transition-all duration-200 ease-in-out outline-none"
              placeholder="Введіть ваш email"
            />
            <div className="flex flex-col items-center relative">
              <textarea
                value={message}
                maxLength={400}
                onChange={e => setMessage(e.target.value)}
                className="resize-none py-3 lg:py-5 px-4 lg:px-6  text-sm lg:text-base leading-none w-full lg:w-auto lg:min-w-[830px] min-h-[102px] lg:min-h-[245px] rounded-[10px] border-2 border-buttonPurple focus:outline-none transition-all duration-200 ease-in-out"
                placeholder="Опишіть проблему або додайте фото"
              />
              <SharedBtn
                type="button"
                primary={true}
                className="mt-6 w-[170px] lg:w-[230px] h-8 lg:h-12 !p-0 text-base"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Відправляємо...' : 'Відправити'}
              </SharedBtn>
              <div className="ml-auto lg:text-sm text-xs text-gray-500 mt-0.5 h-[14px] text-uploadBtnBg absolute right-0 bottom-10 lg:bottom-14">
                {message?.length || 0}/{400}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
