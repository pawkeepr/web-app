/* eslint-disable react-hooks/exhaustive-deps */
import getServerSidePropsPagesPublics from "~/helpers/get-server-side-props-pages-publics"
import ConfirmAccount from "~/pages/Authentication/ConfirmAccount"

const ConfirmAccountNext = () => {
    return (
        <ConfirmAccount />
    )
}

export default ConfirmAccountNext

export const getServerSideProps = getServerSidePropsPagesPublics()