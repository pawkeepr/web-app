import optionsCookies from '~/constants/cookies'

import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    PreviewData,
} from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { ParsedUrlQuery } from 'node:querystring'
import { getCookie } from '~/utils/cookies-utils'

const getServerSidePropsPagesPublics =
    (callback?: GetServerSideProps) =>
    async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
        const lg = ctx.locale || 'pt-br'
        const locale = await serverSideTranslations(lg, ['common'])

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

            return resolve({
                props: {
                    ...locale,
                },
            })
        })
    }

export default getServerSidePropsPagesPublics
