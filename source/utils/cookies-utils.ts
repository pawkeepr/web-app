import { parseCookies, setCookie as setCookieWrapper } from 'nookies';

export function setCookie(name: string, value: string, maxAge?: number) {
    setCookieWrapper(null, name, value, { maxAge });
}

export function getCookie(name: string) {
    return parseCookies(null)[name];
}