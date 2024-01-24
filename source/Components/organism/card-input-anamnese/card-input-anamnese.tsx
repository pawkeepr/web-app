import cn from 'classnames'
import { Formik, type FormikHelpers } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import { BtnConfirm } from '~/Components/atoms/btn'
import FieldNumber from '~/Components/molecules/field-number'
import type { KeyOfQuestionTypes, Question } from '~/constants/anamnese-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { CtxStepAnamnese } from '~/pages/AppointmentsPage/components/validations.yup'
import type { QuestionAnamnesis } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'
import QuestionsAnamnese from './questions-anamnese'

const validationSchema = Yup.object().shape<RecordsShapeYup<QuestionAnamnesis>>({
    name_anamnesis: Yup.string().optional(),
    type_anamnesis: Yup.object().shape({
        value: Yup.string().required('Campo obrigatório'),
        label: Yup.string().required('Campo obrigatório'),
    }),
    notes_anamnesis: Yup.string().optional(),
    list_notes_anamnesis: Yup.array().optional(),
    options_anamnesis: Yup.string()
        .oneOf(['no', 'yes', 'other'])
        .required('Campo obrigatório'),
    logical_list_default_anamnesis: Yup.string().oneOf(['logical']).optional(),
})

type CardInputProps = {
    items: Question[]
    handleSubmit: (
        data: Yup.InferType<typeof validationSchema>,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>
}

const STEPS: {
    title: string
    value: KeyOfQuestionTypes
}[] = [
    {
        title: 'Informações Gerais',
        value: 'general_information',
    },
    {
        title: 'Sistema Digestivo',
        value: 'digestive_system',
    },
    {
        title: 'Sistema Respiratório',
        value: 'respiratory_system',
    },
    {
        title: 'Sistema Urinário',
        value: 'urinary_system',
    },
    {
        title: 'Sistema Nervoso',
        value: 'nervous_system',
    },
    {
        value: 'locomotive_system',
        title: 'Sistema Locomotor',
    },
    {
        value: 'physical_activity',
        title: 'Atividade Física',
    },
]

// Função para calcular o IMC de um animal
// height: altura em centímetros
// weight: peso em quilos
function calcularIMC(height: number, weight: number): number {
    if (height === 0 || weight === 0) {
        return 0 // Evita divisão por zero
    }

    const heightInMeters = height / 100 // Converter altura para metros

    const imc = weight / (heightInMeters * heightInMeters) // Converter altura para metros
    return imc
}

const makeTitle = (title: string, isMobile: boolean) => {
    if (isMobile) {
        return title
            .split(' ')
            .map((item) => item[0])
            .join('')
    }

    return title
}

const CardInputAnamnese = ({ items, handleSubmit }: CardInputProps) => {
    const { values, setFieldValue } = useFormikContextSafe<CtxStepAnamnese>()

    const [category, setCategory] = useState<KeyOfQuestionTypes>('digestive_system')
    const { isMobile } = useResizeMobile()

    const filtered = useMemo(() => {
        if (!values?.anamnesis?.questions_anamnesis) return items

        // filtra items eliminando os que já estão no array de anamnese
        return items.filter((item) => {
            const exists = values?.anamnesis?.questions_anamnesis?.find(
                (question) => {
                    return question.name_anamnesis === item.question
                },
            )

            return !exists
        })
    }, [items, values?.anamnesis?.questions_anamnesis])

    const height = useMemo(
        () => values.details_pet_consultation?.height,
        [values.details_pet_consultation?.height],
    )
    const weight = useMemo(
        () => values.details_pet_consultation?.weight,
        [values.details_pet_consultation?.weight],
    )

    const isValidNumber = useMemo(() => {
        const castedWeight = Number(weight)
        const isNumber = !Number.isNaN(weight)
        const isPositive = castedWeight > 0
        return isNumber && isPositive
    }, [weight])

    useEffect(() => {
        if (height && weight) {
            const imc = calcularIMC(Number(height), Number(weight))
            setFieldValue('details_pet_consultation.imc', imc)
        }
    }, [height, weight])

    return (
        <div
            className="
        gap-2 flex flex-col card shadow-2xl p-8 
        border-primary-500 border-2 relative
        mobile:p-0 mobile:border-none mobile:!shadow-none mobile:!rounded-none
        
        "
        >
            <div className="flex flex-row w-full justify-between flex-wrap">
                {STEPS.map((item) => (
                    <button
                        type="button"
                        onClick={() => setCategory(item.value)}
                        key={item.value}
                        disabled={!isValidNumber}
                        className={cn(
                            'p-2 text-center uppercase bg-opacity-10 bg-primary-500 flex-1 w-full',
                            {
                                'text-primary-500': category === item.value,
                                'text-gray-400': category !== item.value,
                            },
                        )}
                    >
                        {makeTitle(item.title, isMobile)}
                    </button>
                ))}
            </div>
            {category === 'general_information' && (
                <div className="grid grid-cols-1 gap-3">
                    <FieldNumber
                        ctx={values}
                        label="Peso"
                        placeholder="Peso do pet em quilos, exemplo = 0.5 (500 gramas)"
                        required
                        name="details_pet_consultation.weight"
                    />

                    <FieldNumber
                        ctx={values}
                        label="Altura"
                        placeholder="Altura do pet em centímetros, exemplo = 32"
                        name="details_pet_consultation.height"
                    />

                    <FieldNumber
                        ctx={values}
                        label="Comprimento"
                        placeholder="Comprimento do pet em centímetros "
                        className="border-gray-300"
                        name="details_pet_consultation.length"
                    />

                    <div>
                        {values.details_pet_consultation?.imc > 0 && (
                            <h2 className="m-4 font-bold">
                                O IMC do animal é:{' '}
                                {values.details_pet_consultation?.imc?.toFixed(2)}
                            </h2>
                        )}
                    </div>

                    <div className="flex align-items-center justify-center gap-3 mt-4">
                        <BtnConfirm
                            className="text-white"
                            label="Responder"
                            onClick={() => setCategory('digestive_system')}
                            type="button"
                        />
                    </div>
                </div>
            )}
            {category !== 'general_information' && (
                <Formik
                    initialValues={{
                        list_notes_anamnesis: [] as string[],
                        logical_list_default_anamnesis: 'logical',
                        name_anamnesis: '',
                        type_anamnesis: '',
                        notes_anamnesis: '',
                        options_anamnesis: 'no',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <QuestionsAnamnese
                            category={category}
                            questions={filtered}
                        />
                    )}
                </Formik>
            )}
            {/* Botões de Próximo e Anterior 
            <button type="button" className="absolute bottom-4 left-4">
                Anterior
            </button>

            <button type="button" className="absolute bottom-4 right-4">
                Próximo
            </button>
            */}
        </div>
    )
}

export default CardInputAnamnese
