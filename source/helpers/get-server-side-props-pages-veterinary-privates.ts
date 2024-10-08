import optionsCookies from '~/constants/cookies'

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    PreviewData,
} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { ParsedUrlQuery } from 'node:querystring'
import { PUBLIC_ROUTES } from '~/common/public-routes'
import cookies from '~/constants/cookies'
import { getCookie } from '~/utils/cookies-utils'

export type Context =
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | undefined

export type AttributesCognito = {
    email: string
    email_verified: boolean
    'custom:type_profile': '1' | '2'
    'custom:has_profile': 'yes' | 'no'
}
export const fetchProfile = (ctx: Context) => {
    const attr: AttributesCognito = getCookie(cookies.cognito_profile.name, ctx)
    return attr
}

const getServerSidePropsPagesVeterinaryPrivates =
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
        const attr = fetchProfile(ctx)

        if (PUBLIC_ROUTES.includes(route)) {
            return {
                redirect: {
                    destination: '/veterinary/dashboard',
                    permanent: false,
                },
            }
        }

        const notHasProfile = attr?.['custom:has_profile'] === 'no'
        const typeProfile = attr?.['custom:type_profile']

        if (typeProfile && typeProfile !== '1') {
            return {
                redirect: {
                    destination: '/tutor/dashboard',
                    permanent: false,
                },
            }
        }

        if (notHasProfile) {
            return {
                redirect: {
                    destination: '/veterinary/activation',
                    permanent: false,
                },
            }
        }

        if (callback) return callback(ctx)

        const lg = ctx.locale || 'pt-br'
        const locale = await serverSideTranslations(lg, ['common'])

        return {
            props: {
                ...locale,
            },
        }
    }

export default getServerSidePropsPagesVeterinaryPrivates
