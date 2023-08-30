import getServerSidePropsPagesPublics from "~/helpers/get-server-side-props-pages-publics"
import ConfirmAccount from "~/pages/Authentication/ConfirmAccount"

const ConfirmAccountNext = () => {
    return (
        <ConfirmAccount email="nenhum@email.com" />
    )
}

export default ConfirmAccountNext

export const getServerSideProps = getServerSidePropsPagesPublics()