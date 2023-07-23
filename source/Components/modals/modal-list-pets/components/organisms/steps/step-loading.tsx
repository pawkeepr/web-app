import { useFormikContext } from 'formik'
import { useEffect, useMemo } from 'react'
import LoaderError from '~/Components/molecules/loaders/loader-error'
import LoaderPending from '~/Components/molecules/loaders/loader-pending'
import LoaderSuccess from '~/Components/molecules/loaders/loader-success'
import LOADING from '~/constants/loading'
import { useAppSelector } from '~/store/hooks'
import { InitialValues } from '../../../modal-list-pets'
import useSubmitPet from '../use-submit-pet'

type StepLoadingProps = {
    selectedTab: number
    onChangeSelectedTab: (index: number) => void
    handleCloseModal?: () => void
}

const StepLoading = ({ onChangeSelectedTab, handleCloseModal }: StepLoadingProps) => {

    const { isPetSuccess, isLoading, error } = useAppSelector(state => state.Pets)
    const { handleSubmit } = useFormikContext<InitialValues>()
    const pending = useMemo(() => isLoading === LOADING.PENDING, [isLoading])

    useSubmitPet({ handleSubmit })

    useEffect(() => {
        return () => {
            setTimeout(() => {
                if (isPetSuccess || error) {
                    onChangeSelectedTab?.(0)
                    handleCloseModal?.()
                }
            }, 1500)
        }
    }, [onChangeSelectedTab, isPetSuccess, error, handleCloseModal])

    return (
        <div className="mt-3 p-1 gap-2 h-[250px] flex justify-center items-center">
            {pending && (<LoaderPending />)}

            {!pending && isPetSuccess && (
                <LoaderSuccess />
            )}

            {!pending && error && (
                <LoaderError />
            )}
        </div>
    )
}

export default StepLoading