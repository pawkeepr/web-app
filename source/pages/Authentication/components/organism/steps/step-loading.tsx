import { useRouter } from "next/navigation"
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from "~/store/hooks"

import LoaderError from "../../molecules/loaders/loader-error"
import LoaderPending from "../../molecules/loaders/loader-pending"
import LoaderSuccess from "../../molecules/loaders/loader-success"
import Container from "../../template/container"

const StepLoading = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { loading, success, error } = useAppSelector(state => state.Account)

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                router.push("/sign-in")
            }, 3000)
        }
    }, [success, router, dispatch])


    return (
        <Container>
            <div className="flex justify-center items-center h-96">
                {loading && (
                    <LoaderPending />
                )}

                {!loading && success && (
                    <LoaderSuccess />
                )}

                {!loading && error && (
                    <LoaderError />
                )}
            </div>

        </Container>
    )
}

export default StepLoading