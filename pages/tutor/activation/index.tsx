import LayoutAuth from '~/Layouts/LayoutAuth'
import getServerSidePropsTutorActivation from '~/helpers/get-server-side-props-page-tutor-activation'
import ActivationAccount from '~/pages/Modules/veterinary/Authentication/ActivationAccount'

const Activation = () => {
    return (
        <LayoutAuth>
            <ActivationAccount />
        </LayoutAuth>
    )
}

export default Activation

export const getServerSideProps = getServerSidePropsTutorActivation()
