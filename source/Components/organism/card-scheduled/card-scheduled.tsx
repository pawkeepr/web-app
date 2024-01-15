import { useRef, type ForwardRefExoticComponent, type RefAttributes } from 'react'
import { tv } from 'tailwind-variants'
import MyImage from '~/Components/atoms/my-image'
import ravena from '~/assets/images/ravena.jpeg'
import type { IHookModal } from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { VeterinaryConsultation } from '~/types/appointment'
import { getNameTutor } from '~/utils/get-name-tutors'
import BoxButtons from '../box-buttons'
import ModalBoxButtons from '../box-buttons/modal-box-buttons'

type BoxButtonsProps = {
    item: VeterinaryConsultation
}

type CardScheduledProps = {
    checked?: boolean
    appointment: VeterinaryConsultation
    boxButtons?: null | ((props: BoxButtonsProps) => JSX.Element)
}

const card = tv({
    base: `
        bg-white relative flex flex-col rounded-lg px-2 py-2 shadow-md focus:outline-none
    `,
    variants: {
        checked: {
            true: '!bg-primary-500 bg-opacity-60 text-white',
        },
        confirmed: {
            yes: 'border-l-4 !border-[#0971B3]',
            no: '',
        },
        scheduled: {
            yes: 'border-l-4 border-primary-500',
            no: '',
        },
        rescheduled: {
            yes: 'border-l-4 border-secondary-500',
            no: '',
        },
        canceled: {
            yes: 'border-l-4 border-red-500',
            no: '',
        },
        isMobile: {
            true: 'hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer',
            false: 'mobile:grid mobile:grid-cols-2',
        },
    },
})

const CardScheduled = ({
    checked,
    appointment,
    boxButtons = (props) => <BoxButtons {...props} />,
}: CardScheduledProps) => {
    const ref = useRef<ForwardRefExoticComponent<RefAttributes<IHookModal>>>(null)

    const BoxButtons = boxButtons
    const name = getNameTutor(appointment?.tutor_pet_vet.tutor)
    const { isMobile } = useResizeMobile()

    return (
        <article
            key={appointment?.id}
            onClick={() => {
                if (!isMobile) return
                if (!ref?.current) return
                const castRef = ref.current as unknown as IHookModal
                castRef?.showModal?.()
            }}
            onKeyUp={() => {}}
            className={card({
                checked,
                isMobile,
                // a ordem é importante para o tailwind definir a prioridade e sobrescrever o estilo corretamente:
                // Agenda, Reagendada, Confirmada, Cancelada
                scheduled: appointment.appointment_status?.scheduled,
                rescheduled: appointment.appointment_status?.rescheduled,
                confirmed: appointment.appointment_status?.confirmed,
                canceled: appointment.appointment_status?.canceled,
            })}
        >
            <div className="mb-2">
                <div className="flex flex-col w-full">
                    <div className="flex mobile:gap-3 justify-around items-center">
                        <MyImage
                            src={ravena}
                            alt="Picture of the author"
                            width={150}
                            height={150}
                            className="h-32 mt-3 w-32 rounded-full"
                        />

                        <div className="flex flex-col items-center">
                            {'Informações Do Agendamento:'}
                            <div className="">
                                <div className="p-2">
                                    <p className="text-gray-700 md:hidden">
                                        Nome do pet:{' '}
                                        {appointment?.tutor_pet_vet.pet?.name_pet}
                                    </p>
                                    <p className="text-gray-700">
                                        Data:{' '}
                                        {
                                            appointment?.dates_consults
                                                .date_consultation
                                        }
                                    </p>
                                    <p className="text-gray-700">
                                        Horário:{' '}
                                        {
                                            appointment?.dates_consults
                                                .time_consultation
                                        }
                                    </p>
                                    <p className="text-gray-700 md:hidden">
                                        Contato:
                                        {
                                            appointment?.tutor_pet_vet.tutor
                                                ?.contact?.phone
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mobile:hidden items-center">
                            {'Informações Do Pet:'}

                            <div className="p-2 ">
                                <p className="text-gray-700">
                                    Nome do pet:{' '}
                                    {appointment?.tutor_pet_vet.pet?.name_pet}
                                </p>
                                <p className="text-gray-700">
                                    Especie:{' '}
                                    {
                                        appointment?.tutor_pet_vet.pet
                                            ?.specie as string
                                    }
                                </p>
                                <p className="text-gray-700">
                                    Sexo:{' '}
                                    {appointment?.tutor_pet_vet.pet?.sex as string}
                                </p>
                                <p className="text-gray-700">Microchip: 1294</p>
                            </div>
                        </div>
                        <div className="flex mobile:hidden flex-col">
                            {'Informações Do Tutor:'}

                            <div className="p-2">
                                <p className="text-gray-700">Nome: {name}</p>
                                <p className="text-gray-700">
                                    Email:{' '}
                                    {
                                        appointment?.tutor_pet_vet.tutor?.contact
                                            ?.email
                                    }
                                </p>
                                <p className="text-gray-700">
                                    Contato:{' '}
                                    {
                                        appointment?.tutor_pet_vet.tutor?.contact
                                            ?.phone
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {BoxButtons && !isMobile && <BoxButtons item={appointment} />}
            {isMobile && <ModalBoxButtons item={appointment} ref={ref} />}
        </article>
    )
}

export default CardScheduled
