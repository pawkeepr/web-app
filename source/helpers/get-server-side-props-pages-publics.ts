import optionsCookies from '~/constants/cookies'

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    PreviewData,
} from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { getCookie } from '~/utils/cookies-utils'

const getServerSidePropsPagesPublics =
    (callback?: GetServerSideProps) =>
    async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
        return new Promise((resolve) => {
            const name = optionsCookies.token.name
            const token = getCookie(name, ctx)

            if (token) {
                resolve({
                    redirect: {
                        destination: '/dashboard',
                        permanent: false,
                    },
                })
            }

            if (callback) {
                resolve(callback(ctx))
            }

            resolve({
                props: {},
            })
        })
    }

export default getServerSidePropsPagesPublics
