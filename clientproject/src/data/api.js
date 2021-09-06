import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/';

export const multipleFilesUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'multipleFiles', data, options);
    } catch (error) {
        throw error;
    }
}
export const UserLogin = async (data) => {
    try {
        return await axios.post(apiUrl + 'login', data);
    } catch (error) {
        throw error;
    }
}
export const registerUser = async (data) => {
    try {
        await axios.post(apiUrl + 'register', data);
    } catch (error) {
        throw error;
    }
}
export const getMultipleFiles = async () => {
    try {
        const { data } = await axios.get(apiUrl + 'getMultipleFiles');
        return data;
    } catch (error) {
        throw error;
    }
}
