import { Form, Formik, type FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { BtnSuccess } from '~/Components/atoms/btn'
import Label from '~/Components/atoms/label'
import Tag from '~/Components/atoms/tag'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import { TypeDosage, type QuestionVaccination } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'

type CardInputProps = {
    handleSubmit: (
        data: OmitVaccination,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>
    handleRemove?: (index: number) => void
}

type OmitVaccination = Omit<QuestionVaccination, 'type' | 'checked'>
type ShapeVaccination = RecordsShapeYup<OmitVaccination>

const validationSchema = Yup.object().shape<ShapeVaccination>({
    batch: Yup.string().required('O lote é obrigatório'),
    brand: Yup.string().required('O fabricante é obrigatório'),
    date_next_application: Yup.string().optional(),
    dose: Yup.string().required('A dose é obrigatório'),
    notes: Yup.string().optional(),
    revaccination_annual: Yup.boolean().optional(),
    label: Yup.string().required('O nome é obrigatório'),
    value: Yup.string().optional(),
})

const CardInputVaccination = ({ handleSubmit, handleRemove }: CardInputProps) => {
    return (
        <>
            <Formik
                initialValues={
                    {
                        batch: '',
                        brand: '',
                        date_next_application: '',
                        dose: '',
                        notes: '',
                        revaccination_annual: false,
                        label: '',
                        value: '',
                    } as OmitVaccination
                }
                validationSchema={validationSchema}
                onSubmit={async (data, formikHelpers) => {
                    await handleSubmit(data as OmitVaccination, formikHelpers)
                    formikHelpers.resetForm()
                }}
            >
                {({ isValid, handleSubmit, setFieldValue, values }) => (
                    <Form
                        onSubmit={handleSubmit}
                        className="flex flex-row flex-wrap"
                    >
                        <FieldControl
                            required
                            divClassName="w-full"
                            ctx={values}
                            name="label"
                            label="Etiqueta"
                        />

                        <FieldControl
                            required
                            divClassName="w-1/3 flex-shrink-0 flex-grow"
                            ctx={values}
                            name="batch"
                            label="Lote"
                        />

                        <FieldControl
                            required
                            divClassName="w-1/3 flex-shrink-0 flex-grow"
                            ctx={values}
                            name="brand"
                            label="Fabricante"
                        />

                        <Label
                            required
                            label="Dose:"
                            className="flex-grow flex-shrink-0 w-full ml-1"
                            htmlFor="dose"
                        />

                        <div
                            id="dose"
                            className="flex w-full gap-1 mt-2 font-sans text-xs text-gray-500 uppercase justify-evenly"
                        >
                            <Tag
                                name="type_action"
                                selected={values?.dose === TypeDosage.first}
                                onClick={() => {
                                    setFieldValue('dose', TypeDosage.first)
                                }}
                            >
                                1ª Dose
                            </Tag>
                            <Tag
                                name="type_action"
                                selected={values?.dose === TypeDosage.second}
                                onClick={() => {
                                    setFieldValue('dose', TypeDosage.second)
                                }}
                            >
                                2ª Dose
                            </Tag>
                            <Tag
                                name="type_action"
                                selected={values?.dose === TypeDosage.third}
                                onClick={() => {
                                    setFieldValue('dose', TypeDosage.third)
                                }}
                            >
                                3ª Dose
                            </Tag>
                            <Tag
                                name="type_action"
                                selected={values?.dose === TypeDosage.fourth}
                                onClick={() => {
                                    setFieldValue('dose', TypeDosage.fourth)
                                }}
                            >
                                4ª Dose
                            </Tag>
                            <Tag
                                name="type_action"
                                selected={values?.dose === TypeDosage.n_th}
                                onClick={() => {
                                    setFieldValue('dose', TypeDosage.n_th)
                                }}
                            >
                                Nª Dose
                            </Tag>
                        </div>

                        <FieldTextArea
                            className="mb-1"
                            ctx={values}
                            name="notes"
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

export default CardInputVaccination
