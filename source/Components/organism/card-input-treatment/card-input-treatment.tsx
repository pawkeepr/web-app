import { Form, Formik, FormikHelpers } from 'formik'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { BtnConfirm } from '~/Components/atoms/btn'
import FieldControl, { OptionSelect } from '~/Components/molecules/field-control'
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select'
import FieldTextArea from '~/Components/molecules/field-text-area'
import { QuestionTreatment } from '~/types/appointment'
import { RecordsShapeYup } from '~/types/helpers'

type CardInputProps = {
    items?: OptionSelect[]
    handleSubmit?: (
        data: QuestionTreatment,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>
}

const validationSchema = Yup.object().shape<RecordsShapeYup<QuestionTreatment>>({
    type_treatment: Yup.object().shape({
        value: Yup.string().required('Campo obrigatório'),
        label: Yup.string().required('Campo obrigatório'),
    }),
    name_treatment: Yup.string().required('Campo obrigatório'),
    coin_treatment: Yup.string().optional(),
    notes_treatment: Yup.string().optional(),
    list_notes_treatment: Yup.array().optional(),
    logical_list_default_anamnesis: Yup.array().optional(),
    options_anamnesis: Yup.array().optional(),
    value_coin_treatment: Yup.number().optional(),
})

const makeOptions = (items: OptionSelect[]) => {
    return items.map((item) => ({
        value: item.value,
        label: item.label,
        color: 'rgb(255 200 107);',
    }))
}

const CardInputTreatment = ({
    items = [],
    handleSubmit = async (data: QuestionTreatment) => {
        console.log('handleSubmit')
    },
}: CardInputProps) => {
    const options = useMemo(() => makeOptions(items), [items])

    return (
        <Formik
            initialValues={{
                coin_treatment: '',
                name_treatment: '',
                notes_treatment: '',
                type_treatment: '',
                list_notes_treatment: [] as string[],
                value_coin_treatment: '',
                logical_list_default_anamnesis: '',
                options_anamnesis: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, handleSubmit, values }) => (
                <Form
                    onSubmit={handleSubmit}
                    className="gap-2 flex flex-col card shadow-2xl p-8 border-primary-500 border-2"
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
                        label="Observações"
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
