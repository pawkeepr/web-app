/* eslint-disable react-hooks/exhaustive-deps */
import getServerSidePropsPagesPublics from "~/helpers/get-server-side-props-pages-publics"
import ConfirmAccount from "~/pages/Authentication/ConfirmAccount"
import { useAppSelector } from "~/store/hooks"



const ConfirmAccountNext = () => {

    const email = useAppSelector(state => state.ActivateAccount.email)

    return (
        <ConfirmAccount email={email} />
    )
}

export default ConfirmAccountNext

export const getServerSideProps = getServerSidePropsPagesPublics()