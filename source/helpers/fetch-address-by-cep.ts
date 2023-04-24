import axios from 'axios';

const BASE_URL = 'https://viacep.com.br/ws';

export interface IAddress {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: boolean
}


export async function fetchAddressByCep(cep: string) {
    try {
        const zipCodeNumber = cep.replace(/\D/g, '')
        const response = await axios.get(`${BASE_URL}/${zipCodeNumber}/json`);
        return response as unknown as IAddress;
    } catch (error) {
        console.error(error);
        return null;
    }
}

