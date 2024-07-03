import axios from "axios";

export const algorithmList = async () => {
    try {
        const response = await axios.post("http://118.129.145.98:1880/allgo_get");
        // console.log(response.data);
        return response.data;
    } catch(err) {
        console.error(err);
    }

};


export const getAlgorithmById = async (id) => {
    try {
        const response = await axios.post("http://118.129.145.98:1880/allgo_getAlgorithm", {
            "algorithm_id" : id
        });
        console.log(response.data[0]);
        return response.data;
    } catch(err) {
        console.error(err);
    }

};

export const runAlgorithm = async (formData) => {
    try {
        const response = await axios.post("http://118.129.145.98:1880/allgo_run", formData);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};