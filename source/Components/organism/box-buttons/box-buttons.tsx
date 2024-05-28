/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FaCheckCircle, FaEdit, FaPlayCircle } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import {
    BtnConfirm,
    BtnNeutral,
    BtnPrimary,
    BtnSecondary,
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
    const [isStarting, setIsStarting] = useState(false)
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
        setIsStarting(true)
        const route = `/dashboard/appointments?appointment_id=${item.id}&document=${item.tutor_pet_vet?.tutor?.cpf_cnpj}&pet=${item.tutor_pet_vet?.pet?.id_pet}`
        router.prefetch(route)
        setTimeout(() => {
            setIsStarting(false)
            router.push(route)
        }, 1000)
    }, [item])

    return (
        <div
            className="
                items-center justify-center
                w-full gap-1 flex 
                overflow-hidden 
                flex-wrap
                px-2 !py-0
            "
        >
            <BtnPrimary
                condition={
                    !isLoading &&
                    item.appointment_status?.canceled === 'no' &&
                    item.appointment_status?.done === 'no'
                }
                isLoading={isStarting}
                sizeLoading={isMobile ? 96 : 48}
                disabled={isStarting}
                messageLoading="Iniciando consulta... Em instantes você será redirecionado."
                typeLoading="Hearts"
                label="Iniciar Consulta"
                aria-label="Iniciar consulta"
                className="border-none mobile:!w-full w-full "
                onClick={startAppointment}
                icon={<FaPlayCircle />}
            />

            <BtnNeutral
                condition={
                    !isLoading &&
                    item.appointment_status?.canceled === 'no' &&
                    item.appointment_status?.done === 'no'
                }
                disabled={isStarting}
                label="Cancelar"
                aria-label="Cancelar consulta"
                onClick={onClickCancel}
                outline
                className="!w-1/5"
                icon={<MdClose />}
            />

            <BtnSecondary
                condition={
                    !isLoading &&
                    item.appointment_status?.done === 'no' &&
                    item.appointment_status?.canceled === 'no'
                }
                disabled={isStarting}
                label="Reagendar"
                aria-label="Reagendar consulta"
                outline
                onClick={onClickReScheduled}
                className="!w-1/5"
                icon={<FaEdit />}
            />

            <BtnConfirm
                condition={
                    !isLoading &&
                    item.appointment_status?.confirmed === 'no' &&
                    item.appointment_status?.canceled === 'no' &&
                    item.appointment_status?.done === 'no'
                }
                disabled={isStarting}
                label="Confirmar"
                aria-label="Confirmar consulta"
                outline
                className="!w-1/5"
                onClick={onClickConfirmed}
                icon={<FaCheckCircle />}
            />
        </div>
    )
}

export default withLoading(BoxButtons)
