import { useRouter } from "next/navigation"
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from "~/store/hooks"

import { resetProfileFlag } from '~/store/auth/profile/actions'

import { BtnCancel } from "~/Components/atoms/btn"
import LoaderError from "~/Components/molecules/loaders/loader-error"
import LoaderPending from "~/Components/molecules/loaders/loader-pending"
import LoaderSuccess from "~/Components/molecules/loaders/loader-success"
import LOADING from "~/constants/loading"

const StepLoading = ({ prevStep }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(state => state.Profile)

    useEffect(() => {
        if (isLoading === LOADING.SUCCESS) {
            setTimeout(() => {
                router.push("/sign-in")
            }, 3000)
        }
        return () => {
            dispatch(resetProfileFlag())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])


    return (

        <div className="flex justify-center items-center h-96">
            {isLoading === LOADING.PENDING && (
                <LoaderPending />
            )}

            {isLoading === LOADING.SUCCESS && (
                <LoaderSuccess />
            )}

            {isLoading === LOADING.FAILED && (
                <LoaderError />
            )}

            <div className="m-1 bg-secondary-500 hover:bg-secondary-100 disabled:bg-secondary-500 d-flex justify-content-center">
                <BtnCancel onClick={prevStep} label="Voltar" className="m-1 w-40" />
            </div>
        </div>


    )
}

export default StepLoading