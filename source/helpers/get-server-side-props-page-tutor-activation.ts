import optionsCookies from '~/constants/cookies'

import type { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getCookie } from '~/utils/cookies-utils'
import {
    fetchProfile,
    type Context,
} from './get-server-side-props-pages-veterinary-privates'

const getServerSidePropsPageActivation =
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

        const attr = fetchProfile(ctx)
        const hasProfile = attr?.['custom:has_profile'] === 'yes'
        const typeProfile = attr?.['custom:type_profile']

        if (hasProfile) {
            return {
                redirect: {
                    destination: '/veterinary/dashboard',
                    permanent: false,
                },
            }
        }

        if (typeProfile && typeProfile !== '1') {
            return {
                redirect: {
                    destination: '/tutor/dashboard',
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

export default getServerSidePropsPageActivation
