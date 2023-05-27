import { useRouter } from "next/navigation"
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from "~/store/hooks"

import LoaderError from "~/Components/molecules/loaders/loader-error"
import LoaderPending from "~/Components/molecules/loaders/loader-pending"
import LoaderSuccess from "~/Components/molecules/loaders/loader-success"
import LOADING from "~/constants/loading"
import Container from "../../template/container"

const StepLoading = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(state => state.ActivateAccount)

    useEffect(() => {
        if (isLoading === LOADING.SUCCESS) {
            setTimeout(() => {
                router.push("/sign-in")
            }, 3000)
        }
        return () => {
            dispatch({ type: 'RESET' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])


    return (
        <Container>
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
            </div>

        </Container>
    )
}

export default StepLoading