import type { GetServerSidePropsContext } from 'next'
import LayoutAuth from '~/Layouts/LayoutAuth'
import optionsCookies from '~/constants/cookies'
import LogoutPage from '~/pages/Modules/shared/Authentication/LogoutPage'
import { removeCookie, setCookie } from '~/utils/cookies-utils'

const LogoutNextPage = () => {
    return (
        <LayoutAuth>
            <LogoutPage />
        </LayoutAuth>
    )
}

export default LogoutNextPage

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    setCookie(optionsCookies.token.name, null, 0, ctx)
    removeCookie(optionsCookies.token.name, ctx)

    return {
        props: {},
    }
}
