import { Form } from 'formik'
import { useEffect, useMemo } from 'react'
import { BtnPrimary } from '~/Components/atoms/btn'
import SelectModal from '~/Components/modals/select-modal'
import CardTutor from '~/Components/molecules/card-tutor'
import FieldCurrency from '~/Components/molecules/field-currency'

import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { VeterinaryConsultation } from '~/types/appointment'
import {
    PAYMENTS_OPTIONS,
    PAYMENTS_OPTIONS_INSTALLMENTS,
    type GenericObject,
} from '~/types/helpers'
import type { GenericSelect } from '~/types/pet-v2'
import { screen } from '../styles'

type CtxStepPayment = Pick<
    VeterinaryConsultation,
    'appointment_details' | 'tutor_pet_vet' | 'treatments' | 'dates_consults'
> & {}

const StepPayment = () => {
    const { handleSubmit, isSubmitting, isValid, values, setFieldValue } =
        useFormikContextSafe<CtxStepPayment>()

    const form_payment = useMemo(
        () =>
            values.appointment_details?.payment
                ?.form_payment as unknown as GenericSelect,
        [values],
    )

    useEffect(() => {
        const sum = values.treatments?.questions_treatment?.reduce(
            (acc, item) =>
                acc + Number(item.value_coin_treatment.replace(',', '.')),
            0,
        )
        if (sum > 0) {
            setFieldValue(
                'appointment_details.payment.value_payment',
                sum.toFixed(2),
            )
        }
    }, [values.treatments?.questions_treatment])

    useEffect(() => {
        if (form_payment?.value !== 'credit_card') {
            setFieldValue(
                'appointment_details.payment.number_installments',
                PAYMENTS_OPTIONS_INSTALLMENTS[0],
            )
        }
    }, [form_payment])

    return (
        <Form onSubmit={handleSubmit}>
            <div className="h-10" />
            <h4 className="font-sans text-base font-semibold text-center capitalize">
                Pagamento
                <br />
                <span className="text-xs font-bold text-secondary-500">
                    Obrigatório (*)
                </span>
            </h4>
            <div className={screen()}>
                <CardTutor
                    date_consultation={values?.dates_consults?.date_consultation}
                    time_consultation={values?.dates_consults?.time_consultation}
                    tutor={values?.tutor_pet_vet?.tutor}
                    pet={values?.tutor_pet_vet?.pet}
                />

                <div className="z-50 grid grid-cols-3 gap-2 mobile:grid-cols-2">
                    <SelectModal
                        value={
                            values?.appointment_details?.payment
                                ?.form_payment as unknown as GenericObject
                        }
                        onChange={(item) => {
                            setFieldValue(
                                'appointment_details.payment.form_payment',
                                item,
                            )
                        }}
                        isValid={!!form_payment?.value}
                        title="Selecione a Forma de Pagamento"
                        required
                        divClassName="col-span-1"
                        name="appointment_details.payment.form_payment"
                        label="Forma de Pagamento"
                        items={PAYMENTS_OPTIONS}
                    />
                    <SelectModal
                        disabled={form_payment?.value !== 'credit_card'}
                        value={
                            values?.appointment_details?.payment
                                ?.number_installments as unknown as GenericObject
                        }
                        onChange={(item) => {
                            setFieldValue(
                                'appointment_details.payment.number_installments',
                                item,
                            )
                        }}
                        title="Selecione a quantidade de parcelas"
                        divClassName="col-span-1"
                        name="appointment_details.payment.number_installments"
                        label="Parcelas (Somente Crédito)"
                        items={PAYMENTS_OPTIONS_INSTALLMENTS}
                    />

                    <FieldCurrency
                        isValid={
                            Number(
                                values?.appointment_details?.payment?.value_payment?.replace(
                                    ',',
                                    '.',
                                ),
                            ) > 0
                        }
                        required
                        divClassName="col-span-1 mobile:col-span-full"
                        label="R$"
                        name="appointment_details.payment.value_payment"
                    />

                    <legend className="col-span-3 text-xs text-center text-gray-400">
                        Informações de pagamento apenas para efeito de relatório
                    </legend>
                </div>
                <BtnPrimary
                    disabled={!isValid}
                    isLoading={isSubmitting}
                    className="w-full mt-4"
                    type="submit"
                    label="Concluir Consulta"
                />
            </div>
        </Form>
    )
}

export default StepPayment
