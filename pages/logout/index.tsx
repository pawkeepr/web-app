import { GetServerSidePropsContext } from 'next'
import optionsCookies from '~/constants/cookies'
import LogoutPage from '~/pages/Authentication/LogoutPage'
import { removeCookie } from '~/utils/cookies-utils'

const LogoutNextPage = () => {
    return (
        <LogoutPage />
    )
}

export default LogoutNextPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    removeCookie(optionsCookies.token.name, ctx)

    return {
        props: {}
    }
}