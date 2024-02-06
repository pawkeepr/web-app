import optionsCookies from '~/constants/cookies'

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    PreviewData,
} from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { PUBLIC_ROUTES } from '~/common/public-routes'
import { getAPIClient } from '~/services/axios'
import { getVetProfile } from '~/services/helpers'
import { getCookie, removeCookie, setCookie } from '~/utils/cookies-utils'
export type Context =
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | undefined

export const fetchProfile = async (token: string, ctx: Context) => {
    const profileKey = `${optionsCookies.profile.name}-${token}`

    const profile = getCookie(profileKey, ctx)

    if (profile) return profile

    const api = getAPIClient(ctx)

    try {
        const { data: profile } = await getVetProfile(api)
        setCookie(
            profileKey,
            JSON.stringify(profile),
            optionsCookies.profile.expires,
        )
        return profile
    } catch (error: unknown) {
        const { response } = error as { response: { status: number } }

        switch (response?.status) {
            case 401:
                removeCookie(optionsCookies.token.name, ctx)
                return 'Erro interno ao buscar perfil'
            case 404:
                return null
            default:
                return 'Erro interno ao buscar perfil'
        }
    }
}

const getServerSidePropsPagesPrivates =
    (callback?: GetServerSideProps) => async (ctx: Context) => {
        if (!ctx) {
            return {
                redirect: {
                    destination: '/sign-in',
                    permanent: false,
                },
            }
        }

        const name = optionsCookies.token.name
        const token = getCookie(name, ctx)

        if (!token) {
            return {
                redirect: {
                    destination: '/sign-in',
                    permanent: false,
                },
            }
        }

        const route = ctx.resolvedUrl
        const hasProfile = await fetchProfile(token, ctx)

        if (PUBLIC_ROUTES.includes(route)) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                },
            }
        }

        if (!hasProfile) {
            return {
                redirect: {
                    destination: '/veterinary/activation',
                    permanent: false,
                },
            }
        }

        if (callback) return callback(ctx)

        return {
            props: {},
        }
    }

export default getServerSidePropsPagesPrivates
