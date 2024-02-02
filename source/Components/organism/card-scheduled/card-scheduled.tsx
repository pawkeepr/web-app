import {
    useMemo,
    useRef,
    type ForwardRefExoticComponent,
    type RefAttributes,
} from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { tv } from 'tailwind-variants'
import AvatarPet from '~/Components/molecules/avatar-pet'
import type { IHookModal } from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { VeterinaryConsultation } from '~/types/appointment'
import { Gender, GenderBR, MapOptionSpecies, Species } from '~/types/speciesType'
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

export const card = tv({
    base: `
        bg-white relative flex flex-row rounded-sm px-2 py-2 shadow-md focus:outline-none h-64 mobile:h-[540px] mobile:!p-12
        tablet:h-fit
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
            true: 'hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer flex-col',
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

    const pet = useMemo(
        () => ({
            ...appointment.tutor_pet_vet.pet,
            specie: Species[
                appointment.tutor_pet_vet?.pet?.specie as keyof typeof Species
            ],
            gender: Gender[appointment.tutor_pet_vet?.pet?.sex as Gender],
        }),
        [appointment],
    )

    const formattedDateAndHours = useMemo(() => {
        const date = appointment?.dates_consults?.date_consultation
        const hour = appointment?.dates_consults?.time_consultation
        const dateAndHour = `${date} às ${hour}`
        return dateAndHour
    }, [appointment])

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
            <AvatarPet
                name_pet={pet?.name_pet}
                specie={
                    MapOptionSpecies[
                        pet.specie as keyof typeof MapOptionSpecies
                    ] as Species
                }
            />
            <div className="flex flex-col flex-[2] mobile:flex-1 w-full">
                <div className="flex mobile:gap-3 justify-around items-center">
                    <section>
                        <div className="text-gray-500 mb-2">
                            <h3 className="font-bold mb-1">Pet:</h3>
                            <p>{`${pet?.name_pet}, ${pet?.specie}, ${pet?.race}, ${
                                GenderBR[pet?.sex as keyof typeof GenderBR]
                            }`}</p>
                        </div>
                        {pet?.microchip && (
                            <div className="text-gray-500 mb-2 mobile:hidden">
                                <h3 className="font-bold mb-1">
                                    Microchip do Pet:
                                </h3>
                                <p>{pet?.microchip}</p>
                            </div>
                        )}
                        <div className="text-gray-500 mb-2">
                            <h3 className="font-bold mb-1">Nome do Tutor:</h3>
                            <p>{name}</p>
                        </div>
                        <div className="text-gray-500 mb-2">
                            <h3 className="font-bold mb-1">Data da Consulta:</h3>
                            <p>{formattedDateAndHours}</p>
                        </div>
                    </section>
                    <section>
                        <div className="text-gray-500 mb-2 mobile:hidden">
                            <h3 className="font-bold mb-1">Email do Tutor:</h3>
                            <p>
                                {appointment?.tutor_pet_vet.tutor?.contact?.email}
                            </p>
                        </div>

                        <div className="text-gray-500 mb-2 mobile:hidden">
                            <h3 className="font-bold mb-1">Telefone do Tutor:</h3>
                            <p>
                                {appointment?.tutor_pet_vet.tutor?.contact?.phone}
                            </p>
                        </div>
                        {appointment?.tutor_pet_vet.tutor?.contact?.whatsapp && (
                            <div className="text-gray-500 mb-2 gap-2 mobile:hidden">
                                <h3 className="font-bold mb-1">
                                    WhatsApp do Tutor:{' '}
                                </h3>
                                <p className="flex gap-2">
                                    <FaWhatsapp className="text-green-600 text-xl" />

                                    {
                                        appointment?.tutor_pet_vet.tutor?.contact
                                            ?.whatsapp
                                    }
                                </p>
                            </div>
                        )}
                    </section>
                </div>

                {BoxButtons && !isMobile && <BoxButtons item={appointment} />}
                {isMobile && <ModalBoxButtons item={appointment} ref={ref} />}
            </div>
        </article>
    )
}

export default CardScheduled
