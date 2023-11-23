
import { Formik, useFormikContext } from "formik";
import FieldControl from "~/Components/molecules/field-control/field-control";

import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";

import FieldTextArea from '~/Components/molecules/field-text-area/field-text-area';
import { Appointments } from '~/entities/Appointments';
import useAppointment from '~/store/hooks/appointment/use-appointment';

import { useEffect, useMemo } from "react";
import * as Yup from 'yup';
import { StepProps } from "~/Components/modals/modal-list-pets/types";
import BoxButtons from "~/Components/molecules/box-buttons";
import { getProfileSession } from "~/store/actions";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { IScheduledAppointmentVet } from "~/store/slices/appointment-vet/types";
import { IPet } from "~/types/pet";
import { IProfile } from "~/types/profile";
import CardTutor from "../card-tutor";

const validationSchema = Yup.object().shape({
    dates_consults: Yup.object().shape({
        date_consultation: Yup.string().required('Campo obrigatório'),
        time_consultation: Yup.string().required('Campo obrigatório'),
        type_consultation: Yup.string().required('Campo obrigatório'),
        reason_consultation: Yup.string().required('Campo obrigatório'),
    })
});

const StepScheduledAppointment = ({ onChangeStep }: StepProps) => {

    const { values } = useFormikContext<IPet>()


    const initialValues = useMemo(() => ({
        dates_consults: {
            date_consultation: '',
            time_consultation: '',
            type_consultation: '',
            reason_consultation: '',
        },
        contact_tutor: {
            phone: values.ownerEmergencyContact.phone,
            email: values.ownerEmergencyContact.email,
        },
        cpf_tutor: values.ownerEmergencyContact.cpf_cnpj,
        id_pet: values.id,
        name_tutor: values.ownerEmergencyContact.name,
    } as IScheduledAppointmentVet), [values])

    const { handleSubmit } = useAppointment();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProfileSession())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const data = useAppSelector(state => state.Profile.user) as IProfile

    const onSubmit = async (values: any) => {
        const appointment = Appointments.build({
            ...values,
            crmv_vet: data.crmv,
            cpf_cnpj_vet: data.cpf_cnpj,
            vet_data: data,
        });
        await handleSubmit(appointment);
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {
                ({ isValid, handleSubmit }) => (
                    <div className="p-4">
                        <CardTutor tutor={{
                            contact_tutor: {
                                ...values.ownerEmergencyContact,
                                whatsapp: values.ownerEmergencyContact.phone,
                            },
                            cpf_tutor: values.ownerEmergencyContact.cpf_cnpj,
                            name_tutor: values.ownerEmergencyContact.name as string,
                        }} />
                        <div className='flex justify-around gap-3'>
                            <FieldControl
                                label="Data da consulta"
                                name="dates_consults.date_consultation"
                                required
                                className=" "
                                placeholder="exemplo='05/12/2023'"
                                type="date"
                            />

                            <FieldControl
                                label="Hora da consulta"
                                required
                                name="dates_consults.time_consultation"
                                className=" "
                                placeholder="exemplo='14:00'"
                                type="time"
                            />
                        </div>

                        <FieldControl
                            label="Tipo da consulta"
                            name="dates_consults.type_consultation"
                            required
                            className=" "
                            placeholder="exemplo='exame'"
                            type="text"
                        />
                        <FieldControl
                            label="Razão da consulta"
                            name="dates_consults.reason_consultation"
                            required
                            className=" "
                            placeholder="exemplo='consulta de rotina'"
                            type="text"
                        />
                        <FieldTextArea
                            label="Orientações e Anotações"
                            className="form-control"
                            component="textarea"
                            name="dates_consults.observations"
                            type="text"
                        />

                        <BoxButtons
                            link={false}
                            isValid={isValid}
                            onClickSuccess={() => handleSubmit()}
                            onClickCancel={onChangeStep.bind(null, 0)}
                            success={(props) => <BtnPrimary {...props} label='Agendar' />}
                            cancel={(props) => <BtnCancel {...props} label='Voltar' />}
                        />

                    </div>
                )
            }

        </Formik>
    )
}

export default StepScheduledAppointment