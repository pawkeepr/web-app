import { destroyCookie, parseCookies, setCookie as setCookieWrapper } from 'nookies';

export function setCookie(name: string, value: string, maxAge?: number) {
    setCookieWrapper(null, name, value, { maxAge });
}

export function getCookie(name: string, ctx: any = null) {
    const cookie = parseCookies(ctx)[name];

    if (!cookie) {
        return null;
    }

    try {
        return JSON.parse(cookie);
    } catch (e) {
        return cookie;
    }

}

export function removeCookie(name: string, ctx: any = null) {
    destroyCookie(ctx, name);
}