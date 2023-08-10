import getServerSidePropsPagesPublics from '~/helpers/get-server-side-props-pages-publics'
import ActivationAccount from '~/pages/Authentication/ActivationAccount'

const Activation = () => {
    return (
        <ActivationAccount />
    )
}

export default Activation

export const getServerSideProps = getServerSidePropsPagesPublics()
