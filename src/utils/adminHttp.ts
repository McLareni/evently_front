import axios from 'axios';

const URL = import.meta.env.VITE_URL;

// export const getUsers = async () => {
//   try {
//     const response = await axios.get(`${URL}/users`,{
//       headers: {
//         Authorization: `Bearer ${yourToken}`
//       }
//     });
//     const resData = response.data;
//     return resData;
//   } catch (error) {
//     throw new Error('Failed to get user');
//   }
// };

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`${URL}/adminUsers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete user ${error}`);
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await axios(`${URL}/adminUsers/${id}`);
    const resData = response.data;

    return resData;
  } catch (error) {
    throw new Error(`Failed to get user ${error}`);
  }
};
