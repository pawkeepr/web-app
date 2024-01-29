import type { GetServerSidePropsContext } from 'next'
import LayoutAuth from '~/Layouts/LayoutAuth'
import optionsCookies from '~/constants/cookies'
import LogoutPage from '~/pages/Modules/shared/Authentication/LogoutPage'
import { removeCookie } from '~/utils/cookies-utils'

const LogoutNextPage = () => {
    return (
        <LayoutAuth>
            <LogoutPage />
        </LayoutAuth>
    )
}

export default LogoutNextPage

// biome-ignore lint/nursery/useAwait: <explanation>
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    removeCookie(optionsCookies.token.name, ctx)

    return {
        props: {},
    }
}
