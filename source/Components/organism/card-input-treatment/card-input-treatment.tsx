import { Form, Formik, type FormikHelpers } from 'formik'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { BtnConfirm } from '~/Components/atoms/btn'
import FieldControl, {
    type OptionSelect,
} from '~/Components/molecules/field-control'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { QuestionTreatment } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'
import type { MEDICAL_RECORDS } from '~/types/medical-records'

type CardInputProps = {
    items?: OptionSelect[]
    handleSubmit: (
        data: QuestionTreatment,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>
}

type OmitTreatment = Omit<QuestionTreatment, 'type_treatment'> & {
    type_treatment: {
        value: MEDICAL_RECORDS
        label: string
    } | null
}
type ShapeTreatment = RecordsShapeYup<OmitTreatment>

const validationSchema = Yup.object().shape<ShapeTreatment>({
    name_treatment: Yup.string().required('Campo obrigatório'),
    coin_treatment: Yup.string().optional(),
    notes_treatment: Yup.string().optional(),
    type_treatment: Yup.object().shape({
        value: Yup.string().required('Campo obrigatório'),
        label: Yup.string().required('Campo obrigatório'),
    }),
    value_coin_treatment: Yup.string().transform((value) => {
        return value.replace('R$', '').replace(',', '.')
    }),
})

const makeOptions = (items: OptionSelect[]) => {
    return items.map((item) => ({
        value: item.value,
        label: item.label,
        color: 'rgb(255 200 107);',
    }))
}

const CardInputTreatment = ({ items = [], handleSubmit }: CardInputProps) => {
    const options = useMemo(() => makeOptions(items), [items])

    return (
        <Formik
            initialValues={
                {
                    name_treatment: '',
                    coin_treatment: '',
                    notes_treatment: '',
                    type_treatment: null,
                    value_coin_treatment: '',
                } as OmitTreatment
            }
            validationSchema={validationSchema}
            onSubmit={(data, formikHelpers) =>
                handleSubmit(
                    {
                        ...data,
                        type_treatment: data.type_treatment
                            ?.value as MEDICAL_RECORDS,
                    },
                    formikHelpers,
                )
            }
        >
            {({ isValid, handleSubmit, values }) => (
                <Form
                    onSubmit={handleSubmit}
                    className="gap-2 flex flex-col card shadow-2xl p-8 border-secondary-500 rounded-sm border-2"
                >
                    <FieldControlSelect
                        ctx={values}
                        name="type_treatment"
                        required
                        label="Tipo"
                        options={options}
                    />
                    <FieldControl
                        ctx={values}
                        name="name_treatment"
                        label="Nome"
                        required
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
