
import DashboardPage from '~/pages/DashboardPage'

import type { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import optionsCookies from '~/constants/cookies'

const DashboardPageNext = () => {
    return (
        <DashboardPage />
    )
}

export default DashboardPageNext

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = parseCookies(ctx)
    const token = cookies[optionsCookies.token.name]

    if (!token) {
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            }
        }
    }


    return {
        props: {}
    }
}