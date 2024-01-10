import optionsCookies from '~/constants/cookies'

import type { GetServerSideProps } from 'next'
import { getCookie } from '~/utils/cookies-utils'
import { Context, fetchProfile } from './get-server-side-props-pages-privates'

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

        const hasProfile = await fetchProfile(token, ctx)

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
