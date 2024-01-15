import { Formik } from 'formik'
import FieldControl from '~/Components/molecules/field-control/field-control'

import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'

import { Appointments } from '~/entities/Appointments'

import { useCallback, useMemo } from 'react'
import type { StepProps } from '~/Components/modals/list-pets-modal/types'
import BoxButtons from '~/Components/molecules/box-buttons'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useProfileVeterinary from '~/hooks/use-profile-veterinary'
import useListAppointments from '~/store/hooks/list-appointments'
import type { VeterinaryConsultation } from '~/types/appointment'
import type { IPetV2 } from '~/types/pet-v2'
import { calcAge } from '~/utils/calc-age'
import { geolocation } from '~/utils/geolocation'
import CardPet from '../card-pet'
import CardTutor from '../card-tutor'
import { schemaStepAppointmentSchedule } from './validation.yup'

const StepScheduledAppointment = ({
    onChangeStep,
    pet,
    closeModal,
}: StepProps & { pet: IPetV2 }) => {
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
                    form_payment: '',
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
        }),
        [pet, veterinary],
    )
    const { handleSubmit, isLoading } = useListAppointments({
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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schemaStepAppointmentSchedule}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ isValid, handleSubmit, values, isSubmitting }) => (
                <div className="p-4">
                    <div className="gap-1">
                        <CardPet pet={values.tutor_pet_vet?.pet} />
                        <CardTutor
                            tutor={values.tutor_pet_vet?.tutor}
                            document={values.tutor_pet_vet?.tutor?.cpf_cnpj}
                        />
                    </div>
                    <section className="my-2">
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
                            label="Razão da consulta"
                            className="form-control"
                            component="textarea"
                            name="dates_consults.reason_consultation"
                            type="text"
                        />
                    </section>

                    <BoxButtons
                        link={false}
                        isValid={isValid}
                        isLoading={isSubmitting || isLoading}
                        onClickSuccess={() => handleSubmit()}
                        onClickCancel={onChangeStep.bind(null, 0)}
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
