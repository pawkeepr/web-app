import axios from 'axios'
import optionsCookies from '~/constants/cookies'
import { getCookie } from '~/utils/cookies-utils'

export function getAPIClient(ctx?: any) {
    const token = getCookie(optionsCookies.token.name, ctx)

    const api = axios.create({
        baseURL: '/api', 
    })

    api.defaults.headers['Content-Type'] = 'application/json'
    if (token) {
        api.defaults.headers.Authorization = `${token}`
    }

    return api
}

export function getAPIFileClient(ctx?: any) {
    const token = getCookie(optionsCookies.token.name, ctx)

    const api = axios.create({
        baseURL: '/api-file', 
    })

    api.defaults.headers['Content-Type'] = 'application/json'
    // if (token) {
    //     api.defaults.headers.Authorization = `${token}`
    // }

    return api
}
