import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsVeterinaryActivation from '~/helpers/get-server-side-props-page-veterinary-activation'
import ActivationAccount from '~/pages/Modules/veterinary/Authentication/ActivationAccount'

const Activation = () => {
    return (
        <LayoutAuth>
            <ActivationAccount />
        </LayoutAuth>
    )
}

export default Activation

export const getServerSideProps = getServerSidePropsVeterinaryActivation()
