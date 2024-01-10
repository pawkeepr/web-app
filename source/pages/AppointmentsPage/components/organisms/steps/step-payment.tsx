import { Form } from 'formik'
import { useMemo } from 'react'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import CardTutor from '~/Components/molecules/card-tutor'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import FieldNumber from '~/Components/molecules/field-number/field-number'
import { StepProps, Tabs } from '~/types/helpers'

import RadioGroup from '~/Components/molecules/radio-group'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { VeterinaryConsultation } from '~/types/appointment'

type CtxStepPayment = Pick<VeterinaryConsultation, 'appointment_details'>

const StepPayment = ({ activeTab, toggleTab }: StepProps) => {
    const { handleSubmit, isSubmitting, values, isValid } =
        useFormikContextSafe<CtxStepPayment>()

    const form_payment = useMemo(
        () => values.appointment_details?.payment?.form_payment,
        [values],
    )

    const options = new Array(12).fill(0).map((item, index) => ({
        value: index + 1,
        label: `${index + 1} Parcela${index + 1 > 1 ? 's' : ''}`,
        color: 'rgb(255 200 107);',
    }))

    return (
        <Form className="card card-body shadow-lg" onSubmit={handleSubmit}>
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Informações de Pagamento
                <br />
            </h4>
            <CardTutor />
            <div className="grid grid-cols-2 gap-2">
                <RadioGroup
                    name="appointment_details.payment.form_payment"
                    title="Forma de Pagamento"
                    checked={form_payment}
                    items={[
                        {
                            id: 'credit',
                            name: 'Cartão de Crédito',
                            value: 'credit',
                        },
                        {
                            id: 'debit',
                            name: 'Cartão de Débito',
                            value: 'debit',
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
                    ]}
                />
                <FieldControlSelect
                    ctx={values}
                    label="Quantidade de Parcelas"
                    placeholder="Selecione a quantidade de parcelas"
                    name="appointment_details.payment.number_installments"
                    options={options}
                    isDisabled={form_payment !== 'credit'}
                />
                <FieldNumber
                    ctx={values}
                    locales="pt-BR"
                    currency="BRL"
                    label="Valor do Pagamento? (R$)"
                    name="appointment_details.payment.value_payment"
                />
            </div>

            <div className="flex items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    condition={!isSubmitting}
                    onClick={() => {
                        toggleTab((activeTab - 1) as Tabs)
                    }}
                />
                <BtnPrimary
                    disabled={!isValid}
                    isLoading={isSubmitting}
                    type="submit"
                    label="Concluir Consulta"
                />
            </div>
            {/* <div>
                <PDFViewer>
                    <MyDocument />
                </PDFViewer>
            </div> */}
        </Form>
    )
}

export default StepPayment
