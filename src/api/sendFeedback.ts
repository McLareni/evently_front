import { userServices } from './getUserByEmail';

export const sendFeedback = async (userEmail: string, feedbackMessage: string) => {
  try {
    const response = await userServices.post('/feedbacks', {
      userEmail,
      feedbackMessage
    });
    return response.data;
  } catch (error) {
    console.log('ERROR_FROM_FEEDBACK', error);
    throw error;
  }
}; 