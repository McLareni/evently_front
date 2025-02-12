import axios from 'axios';

const URL = import.meta.env.VITE_URL;

export const userServices = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 100, // to 30000
  withCredentials: true,
});

export const getUserByEmail = async (email: string) => {
  try {
    const response = await userServices.get(`authorize/exist/${email}`);
    // console.log("RESPONSE_USER_BY_EMAIL_>>>>",response)
    return response.data;
  } catch (error) {
    console.log('Error get user by email', error);
  }
};
