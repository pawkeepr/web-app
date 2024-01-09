import optionsCookies from '~/constants/cookies';

import type { ParsedUrlQuery } from 'querystring';
import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    PreviewData,
} from 'next';
import { getCookie } from '~/utils/cookies-utils';

const getServerSidePropsPagesPublics =
    (callback?: GetServerSideProps) =>
    async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
        const name = optionsCookies.token.name;
        const token = getCookie(name, ctx);

        if (token) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                },
            };
        }

        if (callback) {
            return callback(ctx);
        }

        return {
            props: {},
        };
    };

export default getServerSidePropsPagesPublics;
