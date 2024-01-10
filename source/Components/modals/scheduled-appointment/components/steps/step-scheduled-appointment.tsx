import { Formik } from 'formik'
import FieldControl from '~/Components/molecules/field-control/field-control'

import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'

import { Appointments } from '~/entities/Appointments'

import { useCallback, useMemo } from 'react'
import * as Yup from 'yup'
import type { StepProps } from '~/Components/modals/list-pets-modal/types'
import BoxButtons from '~/Components/molecules/box-buttons'
import useProfileVeterinary from '~/hooks/use-profile-veterinary'
import type { IDateConsult } from '~/services/helpers'
import useListAppointments from '~/store/hooks/list-appointments'
import type { VeterinaryConsultation } from '~/types/appointment'
import type { IPetV2 } from '~/types/pet-v2'
import { calcAge } from '~/utils/calc-age'
import { geolocation } from '~/utils/geolocation'
import CardPet from '../card-pet'
import CardTutor from '../card-tutor'

const validationSchema = Yup.object().shape({
    dates_consults: Yup.object().shape({
        date_consultation: Yup.string().required('Campo obrigatório'),
        time_consultation: Yup.string().required('Campo obrigatório'),
        type_consultation: Yup.string().required('Campo obrigatório'),
        reason_consultation: Yup.string().required('Campo obrigatório'),
    }),
})

const StepScheduledAppointment = ({
    onChangeStep,
    pet,
    closeModal,
}: StepProps & { pet: IPetV2 }) => {
    const initialValues: VeterinaryConsultation = useMemo(
        () => ({
            anamnesis: {
                note: '',
                questions_anamnesis: [],
            },
            cpf_cnpj_vet: pet.veterinary?.cpf_cnpj,
            crmv_vet: pet.veterinary?.crmv,
            dates_consults: {
                date_consultation: '',
                time_consultation: '',
                type_consultation: '',
                reason_consultation: '',
                additional_remarks: '',
            },
            id_pet: pet.id as string,
            treatments: {
                note: '',
                questions_treatment: [],
            },
            cpf_tutor: pet.cpf_tutor,
            appointment_details: {
                appointment_geolocation: {},
                appointment_signature: {},
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
                pet: pet.pet_information,
                tutor: pet.main_responsible_guardian,
                veterinary: pet.veterinary,
            },
        }),
        [pet],
    )

    const { handleSubmit, isLoading } = useListAppointments({
        mode: 'scheduled',
        handleClose: closeModal,
    })

    const veterinary = useProfileVeterinary()

    const onSubmit = useCallback(
        async (values: VeterinaryConsultation) => {
            const appointment = Appointments.build(values)
            const [geolocationData, signature] = await geolocation()
            appointment
                .defineAppointmentGeolocation(geolocationData)
                .defineAppointmentSignature(signature)

            await handleSubmit(appointment)
        },
        [handleSubmit, veterinary],
    )

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ isValid, handleSubmit, values, isSubmitting }) => (
                <div className="p-4">
                    <div className="gap-1">
                        <CardPet pet={values.tutor_pet_vet?.pet} />
                        <CardTutor
                            tutor={values.tutor_pet_vet?.tutor}
                            document={values.cpf_tutor}
                        />
                    </div>
                    <section className="my-2">
                        <div className="flex justify-around gap-3">
                            <FieldControl
                                ctx={{} as IDateConsult}
                                label="Data da consulta"
                                name="dates_consults.date_consultation"
                                required
                                className=" "
                                placeholder="exemplo='05/12/2023'"
                                type="date"
                            />

                            <FieldControl
                                ctx={{} as IDateConsult}
                                label="Hora da consulta"
                                required
                                name="dates_consults.time_consultation"
                                className=" "
                                placeholder="exemplo='14:00'"
                                type="time"
                            />
                        </div>
                        <div className="flex justify-around gap-3">
                            <FieldControl
                                ctx={{} as IDateConsult}
                                label="Tipo da consulta"
                                name="dates_consults.type_consultation"
                                required
                                className=" "
                                placeholder="exemplo='exame'"
                                type="text"
                            />
                            <FieldControl
                                ctx={{} as IDateConsult}
                                label="Razão da consulta"
                                name="dates_consults.reason_consultation"
                                required
                                className=" "
                                placeholder="exemplo='consulta de rotina'"
                                type="text"
                            />
                        </div>
                        {/* <FieldTextArea
                            ctx={{} as IDateConsult}
                            label="Orientações e Anotações"
                            className="form-control"
                            component="textarea"
                            name="dates_consults"
                            type="text"
                        /> */}
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
