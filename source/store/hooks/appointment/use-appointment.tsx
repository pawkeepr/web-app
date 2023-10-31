import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useCallback } from 'react'
import { Appointments } from '~/entities/Appointments'
import { createAppointmentVet } from '~/services/helpers'
import { errorToast, successToast } from '~/store/helpers/toast'

export const NAME = 'appointments-vet'

const useAppointment = (
) => {
    const superKeys = [NAME]
    const queryClient = useQueryClient()

    const onError = (_err: any, _newData: any, context: any) => {
        queryClient.setQueryData(superKeys, context.oldData)
    }

    const onSettled = async () => {
        await queryClient.invalidateQueries(superKeys)
    }

    const addData = useMutation({
        mutationFn: async (data: Appointments) => {
            const res = await createAppointmentVet(data)
            return res.data
        },
        onSettled,
        onError,
    })

    const handleSubmit = useCallback(
        async (data: Appointments) => {
            try {
                const response = await addData.mutateAsync(data)
                successToast('Adicionado com sucesso')
                return response
            } catch (err) {

                const error = err as AxiosError;
                const statusCode = error?.response?.status

                const msg =
                    typeof error?.response?.data === 'string'
                        ? error?.response?.data
                        : 'Pedimos desculpas, houve um erro'

                if (statusCode === 401) {
                    errorToast('Você não tem permissão para isso', 'Não autorizado')
                    return
                }

                errorToast(msg, 'Tente novamente')

            }
        },
        [addData]
    )

    return {
        isLoading: addData.isLoading,
        isError: addData.isError,
        error: addData.error,
        handleSubmit
    }
}

export default useAppointment