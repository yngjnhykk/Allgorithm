import axios from "axios";
const host = import.meta.env.VITE_API_HOST;


export const registerAlgorithm = async (formData) => {
  try {
    const response = await axios.post(`${host}/allgo_register`, formData);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};