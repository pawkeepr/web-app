import { Form, Formik, type FormikHelpers } from 'formik'
import { useMemo } from 'react'
import * as Yup from 'yup'
import { BtnSuccess } from '~/Components/atoms/btn'
import FieldControl, {
    type OptionSelect,
} from '~/Components/molecules/field-control'
import FieldCurrency from '~/Components/molecules/field-currency'
import FieldTextArea from '~/Components/molecules/field-text-area'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { CtxStepTreatment } from '~/pages/Modules/veterinary/AppointmentsPage/components/validations.yup'
import type { QuestionTreatment } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'
import type { MEDICAL_RECORDS } from '~/types/medical-records'

type CardInputProps = {
    category: OptionSelect
    handleSubmit: (
        data: QuestionTreatment,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>
    handleRemove?: (index: number) => void
}

type OmitTreatment = Omit<QuestionTreatment, 'type_treatment'>
type ShapeTreatment = RecordsShapeYup<OmitTreatment>

const validationSchema = Yup.object().shape<ShapeTreatment>({
    name_treatment: Yup.string().required('Campo obrigatório'),
    coin_treatment: Yup.string().optional(),
    notes_treatment: Yup.string().optional(),
    value_coin_treatment: Yup.string().transform((value) => {
        return value.replace('R$', '').replace(',', '.')
    }),
})

const KeyTreatment = {
    activities_carry: 'Atividades físicas',
    medicine: 'Medicação',
    vaccine: 'Vacina',
    exam: 'Exame',
    nutrition: 'Nutrição Alimentar',
} as const

const CardInputTreatment = ({
    handleSubmit,
    handleRemove,
    category,
}: CardInputProps) => {
    const { values } = useFormikContextSafe<CtxStepTreatment>()

    const filteredItemsSelects = useMemo(() => {
        return (
            values.treatments?.questions_treatment?.filter(
                (item) => item.type_treatment === category.value,
            ) || []
        )
    }, [values.treatments?.questions_treatment, category?.value])

    const Items = useMemo(
        () =>
            filteredItemsSelects?.map((treatment, index) => (
                <div
                    key={`treatment-${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                    }`}
                    className="w-full px-2 py-1 text-xs rounded-md"
                >
                    <div className="flex flex-row w-full px-2 border border-dashed rounded-sm border-primary">
                        <div className="grid w-full grid-cols-12">
                            <h6 className="col-span-3 font-mono font-semibold capitalize ">
                                {treatment.name_treatment}
                            </h6>

                            <h6 className="col-span-3 font-mono font-semibold capitalize">
                                {
                                    KeyTreatment[
                                        treatment.type_treatment as keyof typeof KeyTreatment
                                    ]
                                }
                            </h6>

                            <p className="col-span-3 font-mono capitalize">
                                {treatment.notes_treatment}
                            </p>

                            <p className="col-span-3 font-mono capitalize">
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(
                                    Number.parseFloat(
                                        treatment.value_coin_treatment,
                                    ),
                                )}
                            </p>
                        </div>
                        <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemove?.(index)}
                        >
                            X
                        </button>
                    </div>
                </div>
            )),
        [filteredItemsSelects, handleRemove],
    )

    return (
        <>
            {Items}
            <Formik
                initialValues={{
                    name_treatment: '',
                    coin_treatment: '',
                    notes_treatment: '',
                    type_treatment: null,
                    value_coin_treatment: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (data, formikHelpers) => {
                    await handleSubmit(
                        {
                            ...data,
                            type_treatment: category.value as MEDICAL_RECORDS,
                        },
                        formikHelpers,
                    )
                    formikHelpers.resetForm()
                }}
            >
                {({ isValid, handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <FieldControl
                            ctx={values}
                            name="name_treatment"
                            label="Nome"
                        />

                        <FieldCurrency label="Valor:" name="value_coin_treatment" />

                        <FieldTextArea
                            className="mb-1"
                            name={'notes_treatment' as ''}
                            label="Informações Complementares"
                        />

                        <div className="flex justify-center">
                            <BtnSuccess
                                disabled={!isValid}
                                className="w-full text-white "
                                label="Adicionar"
                                type="submit"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default CardInputTreatment
