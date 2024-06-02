import {
    useMemo,
    useRef,
    type ForwardRefExoticComponent,
    type RefAttributes,
} from 'react'
import { useTranslation } from 'react-i18next'
import { FaWhatsapp } from 'react-icons/fa'
import type { IHookModal } from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { VeterinaryConsultation } from '~/types/appointment'
import { Gender, GenderBR } from '~/types/speciesType'
import { getNameTutor } from '~/utils/get-name-tutors'
import BoxButtons from '../box-buttons'
import { card } from '../card'

type BoxButtonsProps = {
    item: VeterinaryConsultation
}

type CardMedicalRecordProps = {
    appointment: VeterinaryConsultation
    boxButtons?: null | ((props: BoxButtonsProps) => JSX.Element)
}

const CardMedicalRecord = ({
    appointment,
    boxButtons = (props) => <BoxButtons {...props} />,
}: CardMedicalRecordProps) => {
    const ref = useRef<ForwardRefExoticComponent<RefAttributes<IHookModal>>>(null)

    const BoxButtons = boxButtons
    const name = getNameTutor(appointment?.tutor_pet_vet.tutor)
    const { isMobile } = useResizeMobile()
    const { t } = useTranslation('common')

    const pet = useMemo(
        () => ({
            ...appointment.tutor_pet_vet.pet,
            specie: t(appointment.tutor_pet_vet?.pet?.specie),
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
                isMobile,
                // a ordem é importante para o tailwind definir a prioridade e sobrescrever o estilo corretamente:
                // Agenda, Reagendada, Confirmada, Cancelada
            })}
        >
            <div className="flex flex-col flex-[2] mobile:flex-1 w-full">
                <div className="flex items-center justify-around mobile:gap-3">
                    <section>
                        <div className="mb-2 text-gray-500">
                            <h3 className="mb-1 font-bold">Pet:</h3>
                            <p>{`${pet?.name_pet}, ${pet?.specie}, ${pet?.race}, ${
                                GenderBR[pet?.sex as keyof typeof GenderBR]
                            }`}</p>
                        </div>
                        {pet?.microchip && (
                            <div className="mb-2 text-gray-500 mobile:hidden">
                                <h3 className="mb-1 font-bold">
                                    Microchip do Pet:
                                </h3>
                                <p>{pet?.microchip}</p>
                            </div>
                        )}
                        <div className="mb-2 text-gray-500">
                            <h3 className="mb-1 font-bold">Nome do Tutor:</h3>
                            <p>{name}</p>
                        </div>
                        <div className="mb-2 text-gray-500">
                            <h3 className="mb-1 font-bold">Data da Consulta:</h3>
                            <p>{formattedDateAndHours}</p>
                        </div>
                    </section>
                    <section>
                        <div className="mb-2 text-gray-500 mobile:hidden">
                            <h3 className="mb-1 font-bold">Email do Tutor:</h3>
                            <p>
                                {appointment?.tutor_pet_vet.tutor?.contact?.email}
                            </p>
                        </div>

                        <div className="mb-2 text-gray-500 mobile:hidden">
                            <h3 className="mb-1 font-bold">Telefone do Tutor:</h3>
                            <p>
                                {appointment?.tutor_pet_vet.tutor?.contact?.phone}
                            </p>
                        </div>
                        {appointment?.tutor_pet_vet.tutor?.contact?.whatsapp && (
                            <div className="gap-2 mb-2 text-gray-500 mobile:hidden">
                                <h3 className="mb-1 font-bold">
                                    WhatsApp do Tutor:{' '}
                                </h3>
                                <p className="flex gap-2">
                                    <FaWhatsapp className="text-xl text-green-600" />

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
            </div>
        </article>
    )
}

export default CardMedicalRecord
