import { GetServerSidePropsContext } from 'next'
import { destroyCookie } from 'nookies'
import optionsCookies from '~/constants/cookies'
import LogoutPage from '~/pages/Authentication/LogoutPage'

const LogoutNextPage = () => {
    return (
        <LogoutPage />
    )
}

export default LogoutNextPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    destroyCookie(ctx, optionsCookies.token.name)

    return {
        props: {}
    }
}