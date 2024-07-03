import axios from "axios";

export const registerAlgorithm = async (formData) => {
  try {
    const response = await axios.post("http://118.129.145.98:1880/allgo_register", formData);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};