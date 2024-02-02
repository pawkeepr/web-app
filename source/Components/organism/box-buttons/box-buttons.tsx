/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { FaCheckCircle, FaEdit, FaPlayCircle } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import {
    BtnLabel as BtnCancel,
    BtnConfirm,
    BtnPrimary,
    BtnCancel as BtnRescheduled,
} from '~/Components/atoms/btn'
import withLoading from '~/Components/helpers/with-loading'
import {
    ModalPlus,
    usePlusModal,
} from '~/contexts/setters-status-appointments-modals-context'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { VeterinaryConsultation } from '~/types/appointment'

type BoxButtonsProps = {
    isLoading?: boolean
    item: VeterinaryConsultation
}

const BoxButtons = ({ isLoading = false, item }: BoxButtonsProps) => {
    const router = useRouter()
    const { isMobile } = useResizeMobile()
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
            `/dashboard/appointments?appointment_id=${item.id}&document=${item.tutor_pet_vet?.tutor?.cpf_cnpj}&pet=${item.tutor_pet_vet?.pet?.id_pet}`,
        )
    }, [item])

    const labelCancel = useMemo(() => {
        return isMobile ? 'Cancelar' : ''
    }, [isMobile])

    return (
        <div
            className="
                gap-1 justify-end items-end 
                h-full flex w-full 
                mobile:grid mobile:grid-cols-1
                tablet:grid tablet:grid-cols-3
                flex-wrap
            "
        >
            <BtnCancel
                condition={
                    !isLoading &&
                    item.appointment_status?.canceled === 'no' &&
                    item.appointment_status?.done === 'no'
                }
                label={labelCancel}
                onClick={onClickCancel}
                className="text-red-500 border-none mobile:relative mobile:col-span-1 absolute top-0 right-0 w-fit hover:!bg-transparent"
            >
                <MdClose className="h-6 w-6" />
            </BtnCancel>

            <BtnRescheduled
                condition={
                    !isLoading &&
                    item.appointment_status?.done === 'no' &&
                    item.appointment_status?.canceled === 'no'
                }
                label="Reagendar"
                onClick={onClickReScheduled}
                className="border-none mobile:!w-full mobile:col-span-1 text-gray-500 tablet:w-28"
            >
                <FaEdit />
            </BtnRescheduled>

            <BtnConfirm
                condition={
                    !isLoading &&
                    item.appointment_status?.confirmed === 'no' &&
                    item.appointment_status?.canceled === 'no' &&
                    item.appointment_status?.done === 'no'
                }
                label="Confirmar"
                className="border-none mobile:!w-full mobile:col-span-1 text-gray-200  tablet:w-28"
                onClick={onClickConfirmed}
            >
                <FaCheckCircle />
            </BtnConfirm>

            <BtnPrimary
                condition={
                    !isLoading &&
                    item.appointment_status?.canceled === 'no' &&
                    item.appointment_status?.done === 'no'
                }
                label="Iniciar"
                className="border-none mobile:!w-full mobile:col-span-1  tablet:w-28"
                onClick={startAppointment}
            >
                <FaPlayCircle />
            </BtnPrimary>
        </div>
    )
}

export default withLoading(BoxButtons)
