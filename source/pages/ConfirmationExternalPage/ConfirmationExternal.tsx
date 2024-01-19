'use client'

import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { BtnCancel, BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import CanceledExternalModal from '~/Components/modals/client-external-confirmation/canceled-modal/canceled-external-modal'
import ConfirmedExternalModal from '~/Components/modals/client-external-confirmation/confirmed-modal/confirmed-external-modal'
import Loader from '~/Components/organism/loader'
import useAppointmentExternal from '~/store/hooks/appointment-external/use-appointment-external'
import { Species } from '~/types/speciesType'
import { getNameTutor } from '~/utils/get-name-tutors'
import AuthLayout from '../_layouts/auth/auth_layout'

const ConfirmationPage = () => {
    const { query } = useRouter()

    const { activeData, isLoading, error } = useAppointmentExternal({
        id: query.id as string,
        mode: 'confirmed',
    })

    const pet = activeData?.tutor_pet_vet?.pet
    const name_tutor = getNameTutor(activeData?.tutor_pet_vet?.tutor)
    const name_veterinary = activeData?.tutor_pet_vet?.veterinary?.name
    const whatsapp_veterinary =
        activeData?.tutor_pet_vet?.veterinary?.contact?.whatsapp
    const cpf_tutor = activeData?.tutor_pet_vet?.tutor?.cpf_cnpj
    const whatsapp_tutor = activeData?.tutor_pet_vet?.tutor?.contact?.whatsapp
    const crmv = activeData?.tutor_pet_vet?.veterinary?.crmv

    const formattedDateAndHours = useMemo(() => {
        const date = activeData?.dates_consults?.date_consultation
        const hour = activeData?.dates_consults?.time_consultation
        const dateAndHour = `${date} às ${hour}`
        return dateAndHour
    }, [activeData])

    const isPossibleAction = useMemo(() => {
        console.log(error)
        return error?.cause !== 'already_confirmed'
    }, [activeData])

    return (
        <AuthLayout title="Confirmação de Agendamento">
            {!isPossibleAction && !isLoading && (
                <div className="w-full flex flex-col justify-center items-center my-4 ">
                    <p className="text-gray-600 font-normal text-xl ">
                        Este agendamento não está mais disponível para confirmação
                        ou cancelamento. Pois uma ação já foi tomada.
                    </p>
                </div>
            )}

            <Loader condition={isLoading} type="ThreeDots" />

            {activeData && isPossibleAction && (
                <>
                    <div className="flex flex-col justify-center items-center gap-3 lg:mt-5">
                        <p className="text-sm font-bold text-secondary-500">
                            Seja Bem-vindo(a)!
                        </p>
                        <h2 className="text-xl font-semibold leading-6 text-gray-600 dark:!text-gray-200 text-center">
                            {'Confirmar Agendamento'}
                        </h2>

                        <p className="text-xs font-bold text-primary-500 dark:!text-secondary-500 text-center mb-2">
                            {'Esta ação não poderá ser desfeita.'}
                        </p>
                    </div>
                    <section className="flex flex-col justify-start p-4 w-full">
                        <div className="gap-2 flex-wrap flex flex-col mt-2 w-full justify-between ">
                            {name_tutor && (
                                <p className="text-gray-500 flex justify-between">
                                    <strong className="mr-2">Tutor:</strong>
                                    {name_tutor}
                                </p>
                            )}
                            {pet && (
                                <p className="text-gray-500 flex justify-between">
                                    <strong className="mr-2">Pet:</strong>
                                    <span>
                                        {`${pet.name_pet}, ${
                                            Species[pet.specie as Species]
                                        }, ${pet.race as string}`}
                                    </span>
                                </p>
                            )}

                            {cpf_tutor && (
                                <p className="text-gray-500 flex justify-between">
                                    <strong className="mr-2">CPF:</strong>
                                    {cpf_tutor}
                                </p>
                            )}
                            {whatsapp_tutor && (
                                <p className="text-gray-500 flex justify-between">
                                    <strong className="mr-2">WhatsApp:</strong>
                                    <span className="w-fit flex flex-row gap-2 ">
                                        {whatsapp_tutor}
                                        <FaWhatsapp className="text-green-600 text-xl" />
                                    </span>
                                </p>
                            )}

                            <hr className="w-full border-gray-600 dark:border-gray-700" />

                            {name_veterinary && (
                                <p className="text-gray-500 flex justify-between">
                                    <strong className="mr-2">
                                        Veterinário(a):
                                    </strong>
                                    {name_veterinary}
                                </p>
                            )}

                            {crmv && (
                                <p className="text-gray-500 flex justify-between">
                                    <strong className="mr-2">CRMV:</strong>
                                    {crmv}
                                </p>
                            )}

                            {whatsapp_veterinary && (
                                <p className="text-gray-500 flex justify-between">
                                    <strong className="mr-2">WhatsApp:</strong>
                                    <span className="w-fit flex flex-row gap-2 ">
                                        {whatsapp_veterinary}
                                        <FaWhatsapp className="text-green-600 text-xl" />
                                    </span>
                                </p>
                            )}

                            {formattedDateAndHours && (
                                <p className="text-gray-500 flex justify-between">
                                    <strong className="mr-2">
                                        Data e Horário:
                                    </strong>
                                    {formattedDateAndHours}
                                </p>
                            )}
                        </div>
                    </section>

                    <div className="flex flex-row justify-center items-center">
                        <CanceledExternalModal
                            title="Cancelar Agendamento"
                            item={activeData}
                        >
                            {({ showModal }) => (
                                <BtnCancel
                                    label="Cancelar Agendamento"
                                    className="w-full"
                                    onClick={showModal.bind(null)}
                                />
                            )}
                        </CanceledExternalModal>
                        <ConfirmedExternalModal
                            title="Confirmar Agendamento"
                            item={activeData}
                        >
                            {({ showModal }) => (
                                <BtnPrimary
                                    label="Confirmar Agendamento"
                                    className="w-full"
                                    onClick={showModal.bind(null)}
                                />
                            )}
                        </ConfirmedExternalModal>
                    </div>
                </>
            )}
            <div className="w-full flex flex-col justify-center items-center ">
                <p className="-mb-2 text-gray-400 font-normal">
                    Você não tem uma conta? Crie agora mesmo e obtenha todos os
                    benefícios da plataforma
                </p>
                <BtnLink message="Criar Conta" href="/sign-up" />
            </div>
        </AuthLayout>
    )
}

export default ConfirmationPage
