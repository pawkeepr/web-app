import optionsCookies from '~/constants/cookies'

import type { GetServerSideProps } from 'next'
import { getCookie } from '~/utils/cookies-utils'
import {
    fetchProfile,
    type Context,
} from './get-server-side-props-pages-veterinary-privates'

const getServerSidePropsPageActivation =
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

        const attr = fetchProfile(ctx)
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

        if (hasProfile) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                },
            }
        }

        if (callback) return callback(ctx)

        return {
            props: {},
        }
    }

export default getServerSidePropsPageActivation
