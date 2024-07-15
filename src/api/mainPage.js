import axios from "axios";
const host = import.meta.env.VITE_API_HOST;

export const algorithmList = async () => {
    try {
        const response = await axios.post(`${host}/allgo_get`);
        return response.data;
    } catch(err) {
        console.error(err);
    }

};


export const getAlgorithmById = async (id) => {
    try {
        const response = await axios.post(`${host}/allgo_getAlgorithm`, {
            "algorithm_id" : id
        });
        console.log(response.data);
        return response.data;
    } catch(err) {
        console.error(err);
    }

};

export const runAlgorithm = async (formData) => {
    try {
        const response = await axios.post(`${host}/allgo_run`, formData);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const deleteAlgorithm = async (id) => {
    try {
        const response = await axios.post(`${host}/allgo_delete`, id);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};