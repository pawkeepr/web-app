import cn from 'classnames'
import { Formik, type FormikHelpers } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import type { KeyOfQuestionTypes, Question } from '~/constants/anamnese-questions'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { QuestionAnamnesis, VeterinaryConsultation } from '~/types/appointment'
import type { RecordsShapeYup } from '~/types/helpers'
import QuestionsAnamnese from './questions-anamnese'

export type CtxStepAnamnese = Pick<
    VeterinaryConsultation,
    'anamnesis' | 'details_pet_consultation' | 'dates_consults'
>

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
                {() => <QuestionsAnamnese category={category} questions={items} />}
            </Formik>

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
