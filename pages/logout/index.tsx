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

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    removeCookie(optionsCookies.token.name, ctx)
    removeCookie(optionsCookies.profile.name, ctx)
    removeCookie(optionsCookies.cognito_profile.name, ctx)

    return {
        props: {},
    }
}
