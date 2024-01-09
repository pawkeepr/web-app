import { Form, Formik, FormikHelpers } from 'formik';
import { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { BtnConfirm, BtnSecondary } from '~/Components/atoms/btn';
import { OptionSelect } from '~/Components/molecules/field-control';
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select';
import FieldTextArea from '~/Components/molecules/field-text-area';
import RadioGroup from '~/Components/molecules/radio-group';
import {
    Question,
    questions as defaultQuestions,
    keyOfQuestionTypes,
} from '~/constants/anamnese-questions';
import useTranslationSafe from '~/hooks/use-translation-safe';
import { QuestionAnamnesis } from '~/types/appointment';
import { RecordsShapeYup } from '~/types/helpers';

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
    items?: OptionSelect[];
    handleSubmit?: (
        data: Yup.InferType<typeof validationSchema>,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>;
};

const makeOptions = (items: Question[], category: keyOfQuestionTypes) => {
    return items.map((item) => ({
        value: item.id,
        label: item.question,
        color: 'rgb(255 200 107);',
    }));
};

const CardInputAnamnese = ({
    handleSubmit = async (data) => {
        console.log('handleSubmit');
    },
}: CardInputProps) => {
    const [category, setCategory] = useState('');
    const t = useTranslationSafe();
    console.log('t', t('digestive_system'));
    const options = useMemo(
        () => makeOptions(defaultQuestions, 'digestive_system'),
        [],
    );
    const [selected, setSelected] = useState<OptionSelect>(options[0]);

    return (
        <div className="gap-2 flex flex-col card shadow-2xl p-8 border-primary-500 border-2">
            <Formik
                initialValues={{
                    list_notes_anamnesis: [] as string[],
                    logical_list_default_anamnesis: 'logical',
                    name_anamnesis: '',
                    notes_anamnesis: '',
                    options_anamnesis: 'yes',
                    type_anamnesis: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid, handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <FieldControlSelect
                            ctx={values}
                            name="type_anamnesis"
                            required
                            label="Questão"
                            value={selected}
                            onChangeValue={(value) =>
                                setSelected(value as OptionSelect)
                            }
                            options={options}
                        />
                        <RadioGroup
                            ctx={values}
                            title="Resposta"
                            checked={values.options_anamnesis}
                            name="options_anamnesis"
                            items={[
                                {
                                    id: 'yes',
                                    name: 'Sim',
                                    value: 'yes',
                                },
                                {
                                    id: 'no',
                                    name: 'Não',
                                    value: 'no',
                                },
                                {
                                    id: 'other',
                                    name: 'Outro',
                                    value: 'other',
                                },
                            ]}
                        />
                        <FieldTextArea
                            ctx={values}
                            name="notes_anamnesis"
                            label="Anotações"
                        />
                        <div className="flex align-items-center justify-center gap-3 mt-4">
                            <BtnSecondary label="Pular" type="submit" />
                            <BtnConfirm
                                disabled={!isValid}
                                className="text-white"
                                label="Responder"
                                type="submit"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CardInputAnamnese;
