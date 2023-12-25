import getServerSidePropsActivation from '~/helpers/get-server-side-props-page-activation'
import ActivationAccount from '~/pages/Authentication/ActivationAccount'

const Activation = () => {
    return (
        <ActivationAccount />
    )
}

export default Activation

export const getServerSideProps = getServerSidePropsActivation()
