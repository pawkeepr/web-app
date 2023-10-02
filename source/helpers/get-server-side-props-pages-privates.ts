import optionsCookies from "~/constants/cookies";

import type { GetServerSideProps, GetServerSidePropsContext, PreviewData } from "next";
import type { ParsedUrlQuery } from "querystring";
import { getCookie } from "~/utils/cookies-utils";


const getServerSidePropsPagesPrivates =
    (callback?: GetServerSideProps) =>
        async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
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

            if (route === '/activation') {
                return {
                    props: {}
                }
            }

            if (callback) {
                return callback(ctx)
            }

            return {
                props: {}
            }

        }

export default getServerSidePropsPagesPrivates