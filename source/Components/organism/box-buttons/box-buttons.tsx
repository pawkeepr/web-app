/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
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
import type { VeterinaryConsultation } from '~/types/appointment'

type BoxButtonsProps = {
    isLoading?: boolean
    item: VeterinaryConsultation
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
            `/dashboard/appointments?appointment_id=${item.id}&document=${item.tutor_pet_vet?.tutor?.cpf_cnpj}&pet=${item.tutor_pet_vet?.pet?.id_pet}`,
        )
    }, [item])

    return (
        <div
            className="
                items-center justify-center
                w-full gap-1 flex 
                overflow-hidden 
                flex-wrap
                px-2
            "
        >
            <BtnCancel
                condition={
                    !isLoading &&
                    item.appointment_status?.canceled === 'no' &&
                    item.appointment_status?.done === 'no'
                }
                label='Cancelar'
                aria-label='Cancelar consulta'
                onClick={onClickCancel}
                className="!text-red-500 !w-1/4 flex-grow web:text-none border web:!border-none web:absolute web:top-0 web:right-0 web:!w-fit hover:!bg-transparent"
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
                aria-label="Reagendar consulta"
                onClick={onClickReScheduled}
                className="border-none !w-1/4 flex-grow  text-gray-500"
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
                aria-label="Confirmar consulta"
                className="border-none !w-1/4 flex-grow  text-white"
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
                aria-label="Iniciar consulta"
                className="border-none mobile:!w-full w-1/4 flex-grow "
                onClick={startAppointment}
            >
                <FaPlayCircle />
            </BtnPrimary>
        </div>
    )
}

export default withLoading(BoxButtons)
