import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacters = async (status?: string, gender?: string) => {
    const params: { [key: string]: string } = {};
    if (status) params.status = status;
    if (gender) params.gender = gender;
    const response = await api.get('/character', { params });
    return response.data;
};
