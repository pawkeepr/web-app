import getServerSidePropsPages from '~/helpers/get-server-side-props-pages-privates'
import ActivationAccount from '~/pages/Authentication/ActivationAccount'

const Activation = () => {
    return (
        <ActivationAccount />
    )
}

export default Activation

export const getServerSideProps = getServerSidePropsPages()
