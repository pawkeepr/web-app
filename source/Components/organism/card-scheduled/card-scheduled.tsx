import { useMemo } from 'react'
import { FaTransgenderAlt } from 'react-icons/fa'
import {
    IoMdCalendar,
    IoMdCheckmarkCircle,
    IoMdCloseCircle,
    IoMdFemale,
    IoMdMale,
} from 'react-icons/io'
import ptBr from '~/common/languages/pt-BR/common.json'

import AvatarPet from '~/Components/molecules/avatar-pet'
import type { VeterinaryConsultation } from '~/types/appointment'
import { BreedNames } from '~/types/breedType'
import { GenderBR, MapOptionSpecies, type Gender } from '~/types/speciesType'
import { calcAge } from '~/utils/calc-age'
import { getNameTutor } from '~/utils/get-name-tutors'
import BoxButtons from '../box-buttons'
import ModalBoxButtons from '../box-buttons/modal-box-buttons'
import Card from '../card'

type BoxButtonsProps = {
    item: VeterinaryConsultation
}

type CardScheduledProps = {
    appointment: VeterinaryConsultation
    boxButtons?: null | ((props: BoxButtonsProps) => JSX.Element)
}

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
    male: IoMdMale.bind(null, {
        className: 'text-blue-400 w-4 h-4 mobile:absolute bottom-1 right-2',
    }),
    female: IoMdFemale.bind(null, {
        className: 'text-pink-400 w-4 h-4 mobile:absolute bottom-1 right-2',
    }),
    unknown: FaTransgenderAlt.bind(null, {
        className: 'text-purple-400 w-4 h-4 mobile:absolute bottom-1 right-2',
    }),
}

const CardScheduled = ({ appointment }: CardScheduledProps) => {
    const name = getNameTutor(appointment?.tutor_pet_vet.tutor)

    const pet = useMemo(
        () => ({
            ...appointment.tutor_pet_vet.pet,
            specie: ptBr[
                appointment.tutor_pet_vet?.pet?.specie as keyof typeof ptBr
            ],
            race: BreedNames[
                appointment.tutor_pet_vet?.pet?.race as keyof typeof BreedNames
            ],
            sex: GenderBR[appointment.tutor_pet_vet?.pet?.sex as Gender],
        }),
        [appointment],
    )

    const formattedDateAndHours = useMemo(() => {
        const date = Intl.DateTimeFormat('pt-BR').format(
            new Date(appointment?.dates_consults?.date_consultation),
        )
        const hour = appointment?.dates_consults?.time_consultation
        const dateAndHour = `${date} às ${hour}`
        return dateAndHour
    }, [appointment])

    const Gender =
        IconGender[appointment.tutor_pet_vet?.pet?.sex as keyof typeof IconGender]
    const Icon = getIconStatus(appointment.appointment_status)

    return (
        <Card
            boxButtons={() => <BoxButtons item={appointment} />}
            item={appointment}
            modal={ModalBoxButtons}
            sectionAvatar={() => (
                <>
                    <AvatarPet
                        name_pet={pet?.name_pet}
                        specie={
                            MapOptionSpecies[
                                pet.specie as keyof typeof MapOptionSpecies
                            ]
                        }
                    />
                    <div className="flex flex-row gap-1">
                        <h1 className="text-lg font-bold text-center text-gray-500 mobile:text-sm">
                            {`${pet?.name_pet}`}
                        </h1>
                        <Gender />
                    </div>
                    <h2 className="text-xs text-center text-gray-500">
                        {calcAge(pet?.date_birth)} ano(s)
                    </h2>
                </>
            )}
        >
            <>
                <div className="text-gray-500">
                    <h3 className="font-bold ">Pet:</h3>
                    <p>{`${pet?.specie}, ${pet?.race}`}</p>

                    <div>
                        <h3 className="font-bold ">Tutor:</h3>
                        <p>{name}</p>
                    </div>
                    <div>
                        <h3 className="font-bold ">Data:</h3>
                        <p>{formattedDateAndHours}</p>
                    </div>
                </div>
                <span className="absolute top-0 right-0 flex flex-row items-center justify-center gap-2 pt-2 mr-4 text-sm text-gray-400 w-fit web:mr-32 mobile:text-xs">
                    <Icon.icon className={Icon.className} title={Icon.title} />
                    {Icon.title}
                </span>
            </>
        </Card>
    )
}

export default CardScheduled
