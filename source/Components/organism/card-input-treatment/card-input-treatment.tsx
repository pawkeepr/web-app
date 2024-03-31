import { Form, Formik, type FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { BtnConfirm } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { QuestionTreatment } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'
import type { MEDICAL_RECORDS } from '~/types/medical-records'

type CardInputProps = {
    type: MEDICAL_RECORDS
    handleSubmit: (
        data: QuestionTreatment,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>
}

type ShapeTreatment = Omit<RecordsShapeYup<QuestionTreatment>, 'type_treatment'>

const validationSchema = Yup.object().shape<ShapeTreatment>({
    name_treatment: Yup.string().required('Campo obrigatório'),
    coin_treatment: Yup.string().optional(),
    notes_treatment: Yup.string().optional(),
    value_coin_treatment: Yup.string().transform((value) => {
        return value.replace('R$', '').replace(',', '.')
    }),
})

const CardInputTreatment = ({ handleSubmit, type }: CardInputProps) => {
    return (
        <Formik
            initialValues={{
                coin_treatment: 'BRL',
                name_treatment: '',
                notes_treatment: '',
                value_coin_treatment: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, formikHelpers) =>
                handleSubmit(
                    {
                        ...values,
                        type_treatment: type,
                    },
                    formikHelpers,
                )
            }
        >
            {({ isValid, handleSubmit, values }) => (
                <Form onSubmit={handleSubmit} className="gap-2 flex flex-col card">
                    <FieldControl
                        ctx={values}
                        name="name_treatment"
                        label="Nome"
                        required
                    />

                    <FieldNumber
                        ctx={values}
                        locales="pt-BR"
                        currency="BRL"
                        label="Valor do Pagamento? (R$)"
                        name="value_coin_treatment"
                    />

                    <FieldTextArea
                        ctx={values}
                        name={'notes_treatment' as ''}
                        label="Observações e Resultados"
                    />

                    <BtnConfirm
                        disabled={!isValid}
                        className="w-full text-white"
                        label="Adicionar"
                        type="submit"
                    />
                </Form>
            )}
        </Formik>
    )
}

export default CardInputTreatment
