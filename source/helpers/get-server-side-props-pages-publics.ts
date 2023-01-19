import type { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import optionsCookies from "~/constants/cookies"

const getServerSidePropsPagesPublics: GetServerSideProps = async (ctx) => {
    const cookies = parseCookies(ctx)
    const token = cookies[optionsCookies.token.name]

    if (token) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default getServerSidePropsPagesPublics