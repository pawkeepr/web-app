import cn from 'classnames';
import { Formik, FormikHelpers } from 'formik';
import { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { KeyOfQuestionTypes, Question } from '~/constants/anamnese-questions';
import useFormikContextSafe from '~/hooks/use-formik-context-safe';
import { CtxStepAnamnese } from '~/pages/AppointmentsPage/components/organisms/steps/step-anamnese/step-anamnese';
import { QuestionAnamnesis } from '~/types/appointment';
import { RecordsShapeYup } from '~/types/helpers';
import QuestionsAnamnese from './questions-anamnese';
const validationSchema = Yup.object().shape<RecordsShapeYup<QuestionAnamnesis>>(
    {
        name_anamnesis: Yup.string().required('Campo obrigatório'),
        type_anamnesis: Yup.object().shape({
            value: Yup.string().required('Campo obrigatório'),
            label: Yup.string().required('Campo obrigatório'),
        }),
        notes_anamnesis: Yup.string().optional(),
        list_notes_anamnesis: Yup.array().optional(),
        options_anamnesis: Yup.string().optional(),
        logical_list_default_anamnesis: Yup.array().optional(),
    },
);

type CardInputProps = {
    items?: Question[];
    handleSubmit: (
        data: Yup.InferType<typeof validationSchema>,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>;
};

const STEPS: {
    title: string;
    value: KeyOfQuestionTypes;
}[] = [
    {
        title: 'Sistema Digestório',
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
];

const CardInputAnamnese = ({ items = [], handleSubmit }: CardInputProps) => {
    const { values, setFieldValue } = useFormikContextSafe<CtxStepAnamnese>();

    const [category, setCategory] =
        useState<KeyOfQuestionTypes>('digestive_system');

    const filtered = useMemo(() => {
        if (!values?.anamnesis?.questions_anamnesis) return items;

        // filtra items eliminando os que já estão no array de anamnese
        return items.filter((item) => {
            const exists = values?.anamnesis?.questions_anamnesis?.find(
                (question) => {
                    return question.name_anamnesis === item.question;
                },
            );

            return !exists;
        });
    }, []);

    return (
        <div className="gap-2 flex flex-col card shadow-2xl p-8 border-primary-500 border-2">
            <div className="flex flex-row w-full justify-between flex-wrap">
                {STEPS.map((item) => (
                    <button
                        type="button"
                        onClick={() => setCategory(item.value)}
                        key={item.value}
                        className={cn(
                            'p-2 text-center uppercase bg-opacity-10 bg-primary-500 flex-1 w-full',
                            {
                                'text-primary-500': category === item.value,
                                'text-gray-400': category !== item.value,
                            },
                        )}
                    >
                        {item.title}
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
                {() => (
                    <QuestionsAnamnese
                        category={category}
                        questions={filtered}
                    />
                )}
            </Formik>
        </div>
    );
};

export default CardInputAnamnese;
