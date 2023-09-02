import { parseCookies } from "nookies"
import optionsCookies from "~/constants/cookies"

import type { GetServerSideProps, GetServerSidePropsContext, PreviewData } from "next"
import type { ParsedUrlQuery } from "querystring"
import { api } from "~/services/api"
import { getVetProfile } from "~/services/helpers"

const getServerSidePropsPagesPrivates =
    (callback?: GetServerSideProps) =>
        async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
            const cookies = parseCookies(ctx)
            const token = cookies[optionsCookies.token.name]

            if (!token) {
                return {
                    redirect: {
                        destination: '/sign-in',
                        permanent: false,
                    }
                }
            }

            api.defaults.headers.Authorization = `Bearer ${token}`

            const { data } = await getVetProfile()
            console.log(data)



            if (callback) {
                return callback(ctx)
            }

            return {
                props: {}
            }
        }

export default getServerSidePropsPagesPrivates