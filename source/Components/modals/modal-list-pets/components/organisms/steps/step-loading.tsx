import { useFormikContext } from 'formik'
import { useMemo, useState } from 'react'
import LoaderError from '~/Components/molecules/loaders/loader-error'
import LoaderPending from '~/Components/molecules/loaders/loader-pending'
import LoaderSuccess from '~/Components/molecules/loaders/loader-success'
import LOADING from '~/constants/loading'
import { useAppSelector } from '~/store/hooks'
import { InitialValues } from '../../../modal-list-pets'
import useSubmitPet from '../use-submit-pet'

const StepLoading = () => {

    const { isPetSuccess, isLoading, error } = useAppSelector(state => state.Pets)
    const { handleSubmit } = useFormikContext<InitialValues>()
    const pending = useMemo(() => isLoading === LOADING.PENDING, [isLoading])

    useSubmitPet({ handleSubmit })

    return (
        <div className="mt-3 p-1 gap-2 h-[250px]">
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