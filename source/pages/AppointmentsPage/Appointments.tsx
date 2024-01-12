import DashboardLayouts from '../_layouts/dashboard'

import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import { BtnCancel } from '~/Components/atoms/btn'
import ModalConfirm from '~/Components/modals/confirm-modal'
import useProfileVeterinary from '~/hooks/use-profile-veterinary'
import useAppointment from '~/store/hooks/appointment/use-appointment'
import usePetById from '~/store/hooks/pet/use-pets'
import type { VeterinaryConsultation } from '~/types/appointment'
import type { IPetV2 } from '~/types/pet-v2'
import type { DTOProfile } from '~/types/profile'
import { geolocation } from '~/utils/geolocation'
import VerticalTabs from './components/templates/vertical-tabs'
import {
    schemaStepAppointment,
    type SchemaYupAppointment,
} from './components/validations.yup'

type AppointmentsPageProps = {
    document: string
    pet: string
    appointment_id: string
}

const initialValues = (
    { id: id_pet, pet_information, main_responsible_guardian, cpf_tutor }: IPetV2,
    profile: DTOProfile,
    appointment_id: string | null = null,
): VeterinaryConsultation => ({
    id: appointment_id,
    anamnesis: {
        note: '',
        questions_anamnesis: [],
    },
    dates_consults: {
        additional_remarks: '',
        date_consultation: '',
        reason_consultation: '',
        time_consultation: '',
        type_consultation: '',
    },
    treatments: {
        note: '',
        questions_treatment: [],
    },
    details_pet_consultation: {
        age: '',
        height: '',
        imc: 0,
        length: '',
        type_weight: '',
        weight: '',
    },
    appointment_details: {
        appointment_geolocation: {
            latitude: '',
            longitude: '',
            altitude: '',
            date_geolocation: '',
            heading: '',
            precision: '',
            speed: '',
        },
        appointment_signature: {
            browser_device: '',
            date_signature: '',
            ip_address: '',
            operational_system: '',
            signature_data: '',
            status_signature: '',
            type_signature: '',
        },
        payment: {
            coin: '',
            date_payment: '',
            form_payment: 'unknown',
            number_installments: '',
            status_payment: '',
            value_payment: '0',
        },
    },
    tutor_pet_vet: {
        pet: {
            ...pet_information,
            id_pet: id_pet as string,
        },
        tutor: {
            ...main_responsible_guardian,
            cpf_tutor,
        },
        veterinary: {
            ...profile,
            cpf_cnpj: profile.cpf_cnpj,
            crmv: profile.crmv,
        },
    },
})

const AppointmentsPage = ({
    document,
    pet,
    appointment_id,
}: AppointmentsPageProps) => {
    const router = useRouter()

    const { data, isLoading: isLoadingPet, isError } = usePetById(document, pet)
    const profile = useProfileVeterinary()

    const { handleSubmit } = useAppointment()

    const values = useMemo(
        () => initialValues(data as IPetV2, profile, appointment_id),
        [data, profile, appointment_id],
    )

    useEffect(() => {
        geolocation()
    }, [])

    const veterinary = useProfileVeterinary()

    const onSubmit = useCallback(
        async (values: SchemaYupAppointment) => {
            const [appointment_geolocation, appointment_signature] =
                await geolocation()

            try {
                await handleSubmit({
                    ...values,
                    tutor_pet_vet: {
                        ...(values.tutor_pet_vet as VeterinaryConsultation['tutor_pet_vet']),
                        veterinary,
                    },
                    appointment_details: {
                        ...(values.appointment_details as VeterinaryConsultation['appointment_details']),
                        appointment_geolocation,
                        appointment_signature,
                    },
                } as VeterinaryConsultation)
            } catch {
                router.push('/dashboard')
            }
        },
        [handleSubmit, veterinary],
    )

    if (isError) {
        router.back()
        return null
    }

    return (
        <Formik
            onSubmit={onSubmit}
            enableReinitialize
            initialValues={values}
            validationSchema={schemaStepAppointment}
        >
            <DashboardLayouts title="Nova Consulta">
                <div className="gap-2 mt-2 mobile:py-6">
                    <ModalConfirm
                        title="Cancelar Consulta!"
                        onConfirm={() => router.push('/dashboard')}
                        description="Importante!"
                        message="Esta ação irá cancelar todas as operações realizadas até o momento, deseja continuar?"
                    >
                        {({ onChangeOpen }) => {
                            return (
                                <BtnCancel
                                    type="button"
                                    label="Cancelar Consulta"
                                    onClick={() => onChangeOpen(true)}
                                />
                            )
                        }}
                    </ModalConfirm>

                    <VerticalTabs isLoading={isLoadingPet} />
                </div>
            </DashboardLayouts>
        </Formik>
    )
}

export default AppointmentsPage
