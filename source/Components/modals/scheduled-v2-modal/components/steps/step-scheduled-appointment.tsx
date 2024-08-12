import { Formik } from 'formik'
import FieldControl from '~/Components/molecules/field-control/field-control'

import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'

import { Appointments } from '~/entities/Appointments'

import { useCallback, useMemo } from 'react'
import BoxButtons from '~/Components/molecules/box-buttons'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useProfileVeterinary from '~/hooks/use-profile-veterinary'
import { handleSubmitTypeAppointments } from '~/store/hooks/list-appointments/use-list-appointments'
import type { AppointmentStatus, VeterinaryConsultation } from '~/types/appointment'
import type { Breed } from '~/types/breedType'
import { calcAge } from '~/utils/calc-age'
import { geolocation } from '~/utils/geolocation'
import type { StepProps } from '../../types'
import CardPet from '../card-pet'
import CardTutor from '../card-tutor'
import { schemaStepAppointmentSchedule } from './validation.yup'

const StepScheduledAppointment = ({ previousStep, pet, closeModal }: StepProps) => {
    const veterinary = useProfileVeterinary()
    const initialValues: VeterinaryConsultation = useMemo(
        () => ({
            id: '',
            anamnesis: {
                note: '',
                questions_anamnesis: [],
            },
            dates_consults: {
                date_consultation: '',
                time_consultation: '',
                type_consultation: '',
                reason_consultation: '',
                additional_remarks: '',
            },
            treatments: {
                note: '',
                questions_treatment: [],
            },
            appointment_details: {
                appointment_geolocation: {
                    latitude: '',
                    longitude: '',
                    timestamp: '',
                    speed: '',
                    altitude: '',
                    date_geolocation: '',
                    heading: '',
                    precision: '',
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
                    number_installments: '',
                    status_payment: '',
                    value_payment: '',
                },
            },
            details_pet_consultation: {
                age: calcAge(pet.pet_information?.date_birth).toString() || '',
                height: '',
                weight: pet.pet_information?.weight as string,
                imc: 0,
                length: '',
                type_weight: '',
            },
            tutor_pet_vet: {
                pet: {
                    ...pet?.pet_information,
                    id_pet: pet.id as string,
                },
                tutor: pet.main_responsible_guardian,
                veterinary,
            },
            diagnosis: {
                prognosis: '',
                prescription: '',
                notes: '',
            },
            exams_anamnesis: {
                complementary_exams: [],
                physical_exam: {
                    behavior: '',
                    body_state: '',
                    diet: '',
                    fc: '',
                    fr: '',
                    hydration: '',
                    mucous_membranes: '',
                    pa: '',
                    tpc: '',
                    other_finds: [],
                },
            },
            appointment_status: {} as AppointmentStatus,
        }),
        [pet, veterinary],
    )

    const handleSubmit = handleSubmitTypeAppointments({
        mode: 'scheduled',
        handleClose: closeModal,
    })

    const onSubmit = useCallback(
        async (values: VeterinaryConsultation) => {
            const appointment = Appointments.build(values)
            const [geolocationData, signature] = await geolocation()
            appointment
                .defineAppointmentGeolocation(geolocationData)
                .defineAppointmentSignature(signature)
                .defineVeterinary(veterinary)

            await handleSubmit(appointment)
        },
        [handleSubmit],
    )

    const name_pet = useMemo(
        () => pet.pet_information?.name_pet,
        [pet.pet_information],
    )

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schemaStepAppointmentSchedule}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ isValid, handleSubmit, values, isSubmitting }) => (
                <div>
                    <div className="gap-1">
                        <CardPet
                            pet={{
                                name:
                                    name_pet ||
                                    (values.tutor_pet_vet?.pet?.name_pet as string),
                                race: values.tutor_pet_vet?.pet?.race as Breed,
                                specie: values.tutor_pet_vet?.pet?.specie,
                            }}
                        />
                        <CardTutor
                            tutor={{
                                last_name: values.tutor_pet_vet?.tutor
                                    ?.last_name as string,
                                first_name: values.tutor_pet_vet?.tutor
                                    ?.first_name as string,
                                cpf_cnpj: values.tutor_pet_vet?.tutor
                                    ?.cpf_cnpj as string,
                                email: values.tutor_pet_vet?.tutor?.contact
                                    ?.email as string,
                                phone: values.tutor_pet_vet?.tutor?.contact
                                    ?.phone as string,
                                whatsapp: values.tutor_pet_vet?.tutor?.contact
                                    ?.whatsapp as string,
                            }}
                            document={values.tutor_pet_vet?.tutor?.cpf_cnpj}
                        />
                    </div>
                    <section>
                        <div className="flex justify-around gap-3">
                            <FieldControl
                                ctx={values}
                                label="Data da consulta"
                                name="dates_consults.date_consultation"
                                required
                                placeholder="exemplo='05/12/2023'"
                                type="date"
                            />

                            <FieldControl
                                ctx={values}
                                label="Hora da consulta"
                                required
                                name="dates_consults.time_consultation"
                                placeholder="exemplo='14:00'"
                                type="time"
                            />
                        </div>
                        <FieldControl
                            ctx={values}
                            label="Tipo da consulta"
                            name="dates_consults.type_consultation"
                            required
                            className="w-100"
                            placeholder="exemplo='exame'"
                            type="text"
                        />
                        <FieldTextArea
                            ctx={values}
                            label="Motivo da Consulta"
                            className="form-control"
                            component="textarea"
                            name="dates_consults.reason_consultation"
                            type="text"
                        />
                    </section>

                    <BoxButtons
                        link={false}
                        isValid={isValid}
                        isLoading={isSubmitting}
                        onClickSuccess={() => handleSubmit()}
                        onClickCancel={previousStep}
                        success={(props) => (
                            <BtnPrimary {...props} label="Agendar" />
                        )}
                        cancel={(props) => <BtnCancel {...props} label="Voltar" />}
                    />
                </div>
            )}
        </Formik>
    )
}

export default StepScheduledAppointment
