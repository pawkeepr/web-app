import optionsCookies from '~/constants/cookies'

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    PreviewData,
} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { ParsedUrlQuery } from 'node:querystring'
import { PUBLIC_ROUTES } from '~/common/public-routes'
import { getCookie } from '~/utils/cookies-utils'
import { fetchProfile } from './get-server-side-props-pages-veterinary-privates'
export type Context =
    | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
    | undefined

const getServerSidePropsPagesTutorPrivates =
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
                    destination: '/tutor/dashboard',
                    permanent: false,
                },
            }
        }

        const typeProfile = attr?.['custom:type_profile']
        const notHasProfile = attr?.['custom:has_profile'] === 'no'

        if (typeProfile && typeProfile !== '2') {
            return {
                redirect: {
                    destination: '/veterinary/dashboard',
                    permanent: false,
                },
            }
        }

        if (notHasProfile) {
            return {
                redirect: {
                    destination: '/tutor/activation',
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

export default getServerSidePropsPagesTutorPrivates
