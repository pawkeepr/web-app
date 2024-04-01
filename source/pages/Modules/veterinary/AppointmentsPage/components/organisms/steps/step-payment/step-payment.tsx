import { Form } from 'formik'
import { useEffect, useMemo } from 'react'
import { BtnPrimary } from '~/Components/atoms/btn'
import CardTutor from '~/Components/molecules/card-tutor'
import FieldNumber from '~/Components/molecules/field-number/field-number'

import RadioGroup from '~/Components/molecules/radio-group'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { VeterinaryConsultation } from '~/types/appointment'

type CtxStepPayment = Pick<
    VeterinaryConsultation,
    'appointment_details' | 'tutor_pet_vet'
>

const StepPayment = () => {
    const { handleSubmit, isSubmitting, isValid, values, setFieldValue } =
        useFormikContextSafe<CtxStepPayment>()

    const form_payment = useMemo(
        () => values.appointment_details?.payment?.form_payment,
        [values],
    )

    useEffect(() => {
        if (form_payment !== 'credit_card') {
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
            <div className="grid grid-cols-2 gap-2">
                <RadioGroup
                    name="appointment_details.payment.form_payment"
                    title="Forma de Pagamento"
                    className="col-span-1"
                    checked={form_payment}
                    items={[
                        {
                            id: 'credit_card',
                            name: 'Cartão de Crédito',
                            value: 'credit_card',
                        },
                        {
                            id: 'debit_card',
                            name: 'Cartão de Débito',
                            value: 'debit_card',
                        },
                        {
                            id: 'pix',
                            name: 'Pix',
                            value: 'pix',
                        },
                        {
                            id: 'cash',
                            name: 'Dinheiro',
                            value: 'cash',
                        },
                        {
                            id: 'transfer',
                            name: 'Transferência',
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
                    disabled={form_payment !== 'credit_card'}
                />
                <FieldNumber
                    ctx={values}
                    locales="pt-BR"
                    currency="BRL"
                    label="Valor do Pagamento? (R$)"
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
