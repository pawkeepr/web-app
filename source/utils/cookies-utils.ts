import type { CookieSerializeOptions } from 'cookie'
import * as cookies from 'cookies-next'
import type { GetServerSidePropsContext } from 'next'

export function setCookie(
    name: string,
    value: string | null,
    maxAge?: number,
    ctx: GetServerSidePropsContext | null = null,
    options?: CookieSerializeOptions,
) {
    const expires = maxAge ? new Date(Date.now() + maxAge * 1000) : undefined
    return cookies.setCookie(name, value, {
        expires,
        req: ctx?.req,
        res: ctx?.res,
        ...options,
    })
}

export const deleteCookiesWithPrefix = (prefix: string) => {
    // Obtém todos os cookies
    const allCookies = cookies.getCookies()

    // Filtra e deleta os cookies que começam com o prefixo especificado
    for (const cookieName of Object.keys(allCookies)) {
        if (cookieName.startsWith(prefix)) {
            cookies.deleteCookie(cookieName)
        }
    }
}

export function getCookie(
    name: string,
    ctx: GetServerSidePropsContext | null = null,
) {
    const cookie = cookies.getCookie(name, {
        req: ctx?.req,
        res: ctx?.res,
    })

    if (!cookie) {
        return null
    }

    try {
        return cookie
    } catch (e) {
        console.error(e)
        return ''
    }
}

export function removeCookie(
    name: string,
    ctx: GetServerSidePropsContext | null = null,
) {
    return cookies.deleteCookie(name, {
        req: ctx?.req,
        res: ctx?.res,
    })
}
