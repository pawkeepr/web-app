import optionsCookies from '~/constants/cookies'

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    PreviewData,
} from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { PUBLIC_ROUTES } from '~/common/public-routes'
import { getCookie } from '~/utils/cookies-utils'
import { fetchProfile } from './get-server-side-props-pages-veterinary-privates'
export type Context =
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | undefined

const getServerSidePropsPagesTutorPrivates =
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

        if (typeProfile && typeProfile !== '2') {
            return {
                redirect: {
                    destination: '/veterinary/dashboard',
                    permanent: false,
                },
            }
        }

        if (!hasProfile) {
            return {
                redirect: {
                    destination: '/tutor/activation',
                    permanent: false,
                },
            }
        }

        if (callback) return callback(ctx)

        return {
            props: {},
        }
    }

export default getServerSidePropsPagesTutorPrivates
