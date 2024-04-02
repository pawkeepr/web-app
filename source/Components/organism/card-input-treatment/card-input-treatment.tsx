import { Form, Formik, type FormikHelpers } from 'formik'
import { useMemo, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import * as Yup from 'yup'
import { BtnSuccess } from '~/Components/atoms/btn'
import FieldControl, {
    type OptionSelect,
} from '~/Components/molecules/field-control'
import FieldCurrency from '~/Components/molecules/field-currency'
import FieldTextArea from '~/Components/molecules/field-text-area'
import OptionsMenu from '~/Components/molecules/options-menu'
import { makeTitle } from '~/Components/molecules/options-menu/options-menu'
import useKeyboardNavigation from '~/hooks/use-keyboard-navigation'
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
    const [category, setCategory] = useState<OptionSelect>(items[0])
    const options = useMemo(() => makeOptions(items), [items])

    const keyPressLeft = () => {
        setCategory((prev) => {
            const index = items.findIndex((item) => item.value === prev.value)
            const next = items[index - 1]
            if (next) {
                return next
            }
            return prev
        })
    }

    const keyPressRight = () => {
        setCategory((prev) => {
            const index = items.findIndex((item) => item.value === prev.value)
            const next = items[index + 1]
            if (next) {
                return next
            }
            return prev
        })
    }

    useKeyboardNavigation({
        ArrowLeft: keyPressLeft,
        ArrowRight: keyPressRight,
    })

    return (
        <div
            className="
                gap-2 flex flex-col card shadow-2xl p-8 
                border-secondary-500 border relative
                mobile:p-2 mobile:border  mobile:!shadow-none
                min-h-[480px] mobile:min-h-[440px]  rounded-sm
            "
        >
            <h4 className="font-sans text-center font-semibold uppercase">
                {makeTitle(category.label as string, false)}
            </h4>
            <div className="flex flex-row w-full justify-between flex-wrap mb-4">
                {options.map((item) => (
                    <OptionsMenu
                        item={item}
                        option={category}
                        onChangeOption={(item) =>
                            setCategory({
                                ...item,
                                label: item.label,
                                value: item.value,
                            })
                        }
                    />
                ))}
            </div>

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
                    <Form onSubmit={handleSubmit}>
                        <FieldControl
                            ctx={values}
                            name="name_treatment"
                            label="Nome"
                            required
                        />

                        <FieldCurrency label="Valor:" name="value_coin_treatment" />

                        <FieldTextArea
                            className="mb-1"
                            ctx={values}
                            name={'notes_treatment' as ''}
                            label="Informações Complementares"
                        />
                        <div className="flex flex-row">
                            <button
                                onClick={keyPressLeft}
                                type="button"
                                className="btn btn-primary "
                            >
                                <FaArrowLeft />
                            </button>
                            <BtnSuccess
                                disabled={!isValid}
                                className="flex-1 text-white"
                                label="Adicionar"
                                type="submit"
                            />

                            <button
                                onClick={keyPressRight}
                                type="button"
                                className="btn btn-primary"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CardInputTreatment
