import { Form } from 'formik'
import { useEffect, useMemo } from 'react'
import { BtnPrimary } from '~/Components/atoms/btn'
import CardTutor from '~/Components/molecules/card-tutor'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import FieldNumber from '~/Components/molecules/field-number/field-number'

import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { VeterinaryConsultation } from '~/types/appointment'
import type { GenericSelect } from '~/types/pet-v2'

type CtxStepPayment = Pick<
    VeterinaryConsultation,
    'appointment_details' | 'tutor_pet_vet'
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
        if (form_payment.value !== 'credit_card') {
            setFieldValue('appointment_details.payment.number_installments', 1)
        }
    }, [form_payment])

    return (
        <Form onSubmit={handleSubmit}>
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Informações de Pagamento
                <br />
            </h4>
            <CardTutor
                tutor={values.tutor_pet_vet?.tutor}
                pet={values.tutor_pet_vet?.pet}
            />
            <div className="grid grid-cols-3 gap-2 mobile:grid-cols-1">
                <FieldControlSelect
                    ctx={values}
                    name="appointment_details.payment.form_payment"
                    label="Forma de Pagamento"
                    className="col-span-1"
                    checked={form_payment}
                    options={[
                        {
                            label: 'Cartão de Crédito',
                            value: 'credit_card',
                        },
                        {
                            label: 'Cartão de Débito',
                            value: 'debit_card',
                        },
                        {
                            label: 'Pix',
                            value: 'pix',
                        },
                        {
                            label: 'Dinheiro',
                            value: 'cash',
                        },
                        {
                            label: 'Transferência',
                            value: 'transfer',
                        },
                    ]}
                />
                <FieldNumber
                    ctx={values}
                    label="Quantidade de Parcelas"
                    placeholder="Parcelas"
                    maximumFractionDigits={0}
                    maximumIntegerDigits={2}
                    name="appointment_details.payment.number_installments"
                    disabled={form_payment.value !== 'credit_card'}
                />
                <FieldNumber
                    ctx={values}
                    locales="pt-BR"
                    currency="BRL"
                    label="R$"
                    name="appointment_details.payment.value_payment"
                />
            </div>
            <BtnPrimary
                disabled={!isValid}
                isLoading={isSubmitting}
                className="w-full mt-4"
                type="submit"
                label="Concluir Consulta"
            />
        </Form>
    )
}

export default StepPayment
