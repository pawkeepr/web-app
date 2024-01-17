/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { BtnCancel, BtnConfirm, BtnLabel, BtnPrimary } from '~/Components/atoms/btn'
import withLoading from '~/Components/helpers/with-loading'
import {
    ModalPlus,
    usePlusModal,
} from '~/contexts/setters-status-appointments-modals-context'
import type { IAppointmentVet } from '~/store/slices/appointment-vet/types'

type BoxButtonsProps = {
    isLoading?: boolean
    item: IAppointmentVet
}

const BoxButtons = ({ isLoading = false, item }: BoxButtonsProps) => {
    const router = useRouter()
    const { setItem, open, close } = usePlusModal()

    const onClickCancel = useCallback(() => {
        setItem(item)
        close(ModalPlus.Rescheduled)
        open(ModalPlus.CanceledScheduled)
    }, [item])

    const onClickReScheduled = useCallback(() => {
        setItem(item)
        close(ModalPlus.CanceledScheduled)
        open(ModalPlus.Rescheduled)
    }, [])

    const onClickConfirmed = useCallback(() => {
        setItem(item)
        close(ModalPlus.ConfirmedScheduled)
        open(ModalPlus.ConfirmedScheduled)
    }, [])

    const startAppointment = useCallback(() => {
        router.push(
            `/dashboard/appointments?appointment_id=${item.id}&document=${item.cpf_tutor}&pet=${item.id_pet}`,
        )
    }, [item])

    return (
        <div className="gap-1 justify-end flex w-full mobile:grid mobile:grid-cols-1 flex-wrap">
            <BtnLabel
                condition={!isLoading}
                label="Cancelar Consulta"
                onClick={onClickCancel}
                className="text-red-500 border-none mobile:col-span-1"
            />

            <BtnCancel
                condition={!isLoading}
                label="Reagendar Consulta"
                onClick={onClickReScheduled}
                className="border-none mobile:!w-full mobile:col-span-1 text-gray-500"
            />

            <BtnConfirm
                label="Confirmar Consulta"
                className="border-none mobile:!w-full mobile:col-span-1 text-gray-200"
                onClick={onClickConfirmed}
            />

            <BtnPrimary
                label="Iniciar Consulta"
                className="border-none mobile:!w-full mobile:col-span-1"
                onClick={startAppointment}
            />
        </div>
    )
}

export default withLoading(BoxButtons)
