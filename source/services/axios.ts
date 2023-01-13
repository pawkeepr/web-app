import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
    const { 'pawkeepr.token': token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: process.env.API_URL,
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}