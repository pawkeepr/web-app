import optionsCookies from '~/constants/cookies'

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    PreviewData,
} from 'next'
import type { ParsedUrlQuery } from 'querystring'
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
    (callback?: GetServerSideProps) => (ctx: Context) => {
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
                    destination: '/dashboard',
                    permanent: false,
                },
            }
        }

        const hasProfile = attr?.['custom:has_profile'] === 'yes'
        const typeProfile = attr?.['custom:type_profile']

        if (typeProfile && typeProfile !== '1') {
            return {
                redirect: {
                    destination: '/tutor/dashboard',
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

export default getServerSidePropsPagesVeterinaryPrivates
