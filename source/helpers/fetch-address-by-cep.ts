import axios from 'axios';

const BASE_URL = 'https://viacep.com.br/ws';

export async function fetchAddressByCep(cep: string) {
    try {
        const zipCodeNumber = cep.replace(/\D/g, '')
        const response = await axios.get(`${BASE_URL}/${zipCodeNumber}/json`);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

