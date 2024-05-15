import DashboardLayouts from '../../_layouts/dashboard'

import { format } from 'date-fns'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import RouteConfirmationModal from '~/Components/modals/route-confirmation-modal'
import useProfileVeterinary from '~/hooks/use-profile-veterinary'
import { handleSubmitAppointments } from '~/store/hooks/appointment-id/use-appointment'
import usePetById from '~/store/hooks/pet-by-id/use-pets'
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

export const makeInitialValues = (
    data: IPetV2,
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
        // format date 2024-02-14
        date_consultation: format(new Date(), 'yyyy-MM-dd'),
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
            form_payment: 'cash',
            number_installments: '1',
            status_payment: '',
            value_payment: '',
        },
    },
    tutor_pet_vet: {
        pet: {
            ...data?.pet_information,
            id_pet: data?.id as string,
        },
        tutor: data?.main_responsible_guardian,
        veterinary: {
            ...profile,
            cpf_cnpj: profile?.cpf_cnpj,
            crmv: profile?.crmv,
        },
    },
})

const AppointmentsPage = ({
    document,
    pet,
    appointment_id,
}: AppointmentsPageProps) => {
    const router = useRouter()

    const {
        activeData,
        isLoading: isLoadingPet,
        isError,
    } = usePetById(document, pet)
    const profile = useProfileVeterinary()

    const handleSubmit = handleSubmitAppointments(() => {
        router.push('/dashboard')
    })

    const values = useMemo(
        () => makeInitialValues(activeData as IPetV2, profile, appointment_id),
        [activeData, profile, appointment_id],
    )

    useEffect(() => {
        geolocation()
    }, [])

    const veterinary = useProfileVeterinary()

    const onSubmit = useCallback(
        async (values: SchemaYupAppointment) => {
            const [appointment_geolocation, appointment_signature] =
                await geolocation()

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
            <DashboardLayouts title="Nova Consulta" searchBlock={false}>
                <VerticalTabs isLoading={isLoadingPet} />
                <RouteConfirmationModal
                    title="Cancelar Consulta!"
                    description="Importante!"
                    message="Esta ação irá cancelará todas as operações realizadas até o momento, deseja continuar?"
                />
            </DashboardLayouts>
        </Formik>
    )
}

export default AppointmentsPage
