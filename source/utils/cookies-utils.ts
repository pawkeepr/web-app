import type { CookieSerializeOptions } from 'cookie'
import Cookies from 'js-cookie'
import type { GetServerSidePropsContext } from 'next'
import { destroyCookie, parseCookies, setCookie as setCookieWrapper } from 'nookies'

export function setCookie(
    name: string,
    value: string,
    maxAge?: number,
    ctx: GetServerSidePropsContext | null = null,
    options?: CookieSerializeOptions,
) {
    return setCookieWrapper(ctx, name, value, { ...options, maxAge })
}

export const deleteCookiesWithPrefix = (prefix: string) => {
    // Obtém todos os cookies
    const allCookies = Cookies.get()

    // Filtra e deleta os cookies que começam com o prefixo especificado
    for (const cookieName of Object.keys(allCookies)) {
        if (cookieName.startsWith(prefix)) {
            Cookies.remove(cookieName)
        }
    }
}

export function getCookie(name: string, ctx: any = null) {
    const cookie = parseCookies(ctx)[name]

    if (!cookie) {
        return null
    }

    try {
        return JSON.parse(cookie)
    } catch (e) {
        return cookie
    }
}

export function removeCookie(name: string, ctx: any = null) {
    return destroyCookie(ctx, name)
}
