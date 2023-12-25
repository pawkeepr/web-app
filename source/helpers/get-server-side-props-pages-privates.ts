import optionsCookies from "~/constants/cookies";

import type { GetServerSideProps, GetServerSidePropsContext, PreviewData } from "next";
import type { ParsedUrlQuery } from "querystring";
import { api } from "~/services/api";
import { getVetProfile } from "~/services/helpers";
import { getCookie } from "~/utils/cookies-utils";

type Context = GetServerSidePropsContext<ParsedUrlQuery, PreviewData> | undefined

const fetchProfile = async (token: string, ctx: Context) => {
    const profileKey = `${optionsCookies.profile.name}-${token}`

    const profile = getCookie(profileKey, ctx)

    if (profile) {
        return JSON.parse(profile)
    }

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    return await getVetProfile()

}

const PUBLIC_ROUTES = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/activation',
    '/logout',
    '/confirm-account'
]

const getServerSidePropsPagesPrivates =
    (callback?: GetServerSideProps) =>
        async (ctx: Context) => {

            if (!ctx) {
                return {
                    redirect: {
                        destination: '/sign-in',
                        permanent: false,
                    }
                }
            }

            const name = optionsCookies.token.name
            const token = getCookie(name, ctx)

            if (!token) {
                return {
                    redirect: {
                        destination: '/sign-in',
                        permanent: false,
                    }
                }
            }

            const route = ctx.resolvedUrl
            const hasProfile = fetchProfile(token, ctx)


            if (PUBLIC_ROUTES.includes(route)) {
                return {
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    }
                }
            }



            if (callback) return callback(ctx)

            return {
                props: {}
            }

        }

export default getServerSidePropsPagesPrivates