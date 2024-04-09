import {
    useMemo,
    useRef,
    type ForwardRefExoticComponent,
    type RefAttributes,
} from 'react';
import { FaTransgenderAlt } from "react-icons/fa";
import { IoMdCalendar, IoMdCheckmarkCircle, IoMdCloseCircle, IoMdFemale, IoMdMale } from "react-icons/io";
import { tv } from 'tailwind-variants';
import AvatarPet from '~/Components/molecules/avatar-pet';
import type { IHookModal } from '~/hooks/use-modal';
import useResizeMobile from '~/hooks/use-resize-mobile';
import type { VeterinaryConsultation } from '~/types/appointment';
import { BreedNames } from '~/types/breedType';
import {
    GenderBR,
    MapOptionSpecies,
    Species,
    type Gender,
} from '~/types/speciesType';
import { calcAge } from '~/utils/calc-age';
import { getNameTutor } from '~/utils/get-name-tutors';
import BoxButtons from '../box-buttons';
import ModalBoxButtons from '../box-buttons/modal-box-buttons';

type BoxButtonsProps = {
    item: VeterinaryConsultation
}

type CardScheduledProps = {
    appointment: VeterinaryConsultation
    boxButtons?: null | ((props: BoxButtonsProps) => JSX.Element)
}

export const card = tv({
    base: `
        card card-side !flex shadow-xl border border-gray-200 m-2
        
    `,
    variants: {
        isMobile: {
            true: 'hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer',
        },
    },
})

// a ordem é importante para o tailwind definir a prioridade e sobrescrever o estilo corretamente:
// Agenda, Reagendada, Confirmada, Cancelada

// scheduled: appointment.appointment_status?.scheduled,
// rescheduled: appointment.appointment_status?.rescheduled,
// confirmed: appointment.appointment_status?.confirmed,
// canceled: appointment.appointment_status?.canceled,

// objeto com os status e seus respectivos ícones para serem exibidos no card, biblioteca utilizada react icons
export const IconStatus = {
    scheduled: {
        icon: IoMdCalendar,
        className: 'text-secondary-500 w-5 h-5',
        title: 'Agendado',
    },
    rescheduled: {
        icon: IoMdCalendar,
        className: 'text-secondary-500 w-5 h-5',
        title: 'Reagendado',
    },
    confirmed: {
        icon: IoMdCheckmarkCircle,
        className: 'text-primary-500 w-5 h-5',
        title: 'Confirmado',
    },
    canceled: {
        icon: IoMdCloseCircle,
        className: 'text-red-500 w-5 h-5',
        title: 'Cancelado',
    },
}

const getIconStatus = (status: VeterinaryConsultation['appointment_status']) => {
    if (status?.canceled === 'yes') return IconStatus.canceled
    if (status?.confirmed === 'yes') return IconStatus.confirmed
    if (status?.rescheduled === 'yes') return IconStatus.rescheduled

    return IconStatus.scheduled
}


export const IconGender = {
    male: IoMdMale.bind(null, { className: 'text-blue-500 w-5 h-5 mobile:absolute bottom-1 right-2' }),
    female: IoMdFemale.bind(null, { className: 'text-pink-500 w-5 h-5 mobile:absolute bottom-1 right-2' }),
    unknown: FaTransgenderAlt.bind(null, { className: 'text-purple-500 w-5 h-5 mobile:absolute bottom-1 right-2' }),
}

const CardScheduled = ({
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
            race: BreedNames[
                appointment.tutor_pet_vet?.pet?.race as keyof typeof BreedNames
            ],
            sex: GenderBR[appointment.tutor_pet_vet?.pet?.sex as Gender],
        }),
        [appointment],
    )

    const formattedDateAndHours = useMemo(() => {
        const date = appointment?.dates_consults?.date_consultation
        const hour = appointment?.dates_consults?.time_consultation
        const dateAndHour = `${date} às ${hour}`
        return dateAndHour
    }, [appointment])

    const Gender = IconGender[appointment.tutor_pet_vet?.pet?.sex as keyof typeof IconGender]
    const Icon = getIconStatus(appointment.appointment_status)

    return (
        <article
            key={appointment?.id}
            onClick={() => {
                if (!isMobile) return
                if (!ref?.current) return
                const castRef = ref.current as unknown as IHookModal
                castRef?.showModal?.()
            }}
            onKeyUp={() => { }}
            style={{
                cursor: isMobile ? 'pointer' : 'default',
                outline: 'none',
            }}
            className={card({
                isMobile,
            })}
        >
            <div className="flex-[2] flex-col items-center justify-center flex">
                <AvatarPet
                    name_pet={pet?.name_pet}
                    specie={
                        MapOptionSpecies[
                        pet.specie as keyof typeof MapOptionSpecies
                        ] as Species
                    }
                />
                <div className="flex flex-row gap-1">
                    <h1
                        className="text-center font-bold text-lg mobile:text-sm text-gray-400"

                    >{`${pet?.name_pet}`}

                    </h1>
                    <Gender />
                </div>
                <h2 className="text-center text-xs">{calcAge(pet?.date_birth)} ano(s)</h2>
            </div>

            <div className="card-body mobile:text-xs text-sm gap-1 mobile:py-4 px-0 m-0 flex-[3] font-sans">
                <div className="text-gray-500  ">
                    <h3 className="font-bold ">Pet:</h3>
                    <p>{`${pet?.specie}, ${pet?.race}`}</p>

                    <div className="text-gray-500 ">
                        <h3 className="font-bold ">Nome do Tutor:</h3>
                        <p>{name}</p>
                    </div>
                    <div className="text-gray-500 ">
                        <h3 className="font-bold ">Data da Consulta:</h3>
                        <p>{formattedDateAndHours}</p>
                    </div>
                </div>
                <div className="card-actions mobile:hidden">
                    {BoxButtons && !isMobile && <BoxButtons item={appointment} />}
                    {isMobile && <ModalBoxButtons item={appointment} ref={ref} />}
                </div>
                <span className='flex flex-row w-40 items-center justify-center gap-2 p-2 absolute top-0 mobile:right-0 mobile:text-xs text-sm text-gray-600 web:left-0'>
                    <Icon.icon className={Icon.className} title={Icon.title} />
                    {Icon.title}
                </span>
            </div>

        </article>
    )
}

export default CardScheduled
