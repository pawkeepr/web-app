import {
    type ForwardRefExoticComponent,
    type RefAttributes,
    useMemo,
    useRef,
} from 'react'
import { tv } from 'tailwind-variants'
import AvatarPet from '~/Components/molecules/avatar-pet'
import type { IHookModal } from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { VeterinaryConsultation } from '~/types/appointment'
import { BreedNames } from '~/types/breedType'
import {
    type Gender,
    GenderBR,
    MapOptionSpecies,
    Species,
} from '~/types/speciesType'
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
        card card-side !flex rounded-md shadow-xl border border-gray-200
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
            <div className="flex-[2] flex-col items-center justify-center flex">
                <AvatarPet
                    name_pet={pet?.name_pet}
                    specie={
                        MapOptionSpecies[
                        pet.specie as keyof typeof MapOptionSpecies
                        ] as Species
                    }
                />
                <h1
                    className="text-center font-bold text-lg mobile:text-sm text-gray-400"

                >{`${pet?.name_pet}`}</h1>
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
                <div className="card-actions mobile:hidden  ">
                    {BoxButtons && !isMobile && <BoxButtons item={appointment} />}
                    {isMobile && <ModalBoxButtons item={appointment} ref={ref} />}
                </div>
            </div>
        </article>
    )
}

export default CardScheduled
