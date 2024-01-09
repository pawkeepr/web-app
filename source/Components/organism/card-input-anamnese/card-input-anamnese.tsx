import { Form, Formik, FormikHelpers } from 'formik';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { BtnConfirm } from '~/Components/atoms/btn';
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select';
import FieldTextArea from '~/Components/molecules/field-text-area';
import RadioGroup from '~/Components/molecules/radio-group';
import { OptionSelect } from '~/store/slices/appointment-vet/types';
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

const makeOptions = (items: OptionSelect[]) => {
    return items.map((item) => ({
        value: item.value,
        label: item.label,
        color: 'rgb(255 200 107);',
    }));
};

const CardInputAnamnese = ({
    items = [],
    handleSubmit = async (data) => {
        console.log('handleSubmit');
    },
}: CardInputProps) => {
    const options = useMemo(() => makeOptions(items), [items]);

    return (
        <Formik
            initialValues={{
                list_notes_anamnesis: [] as string[],
                logical_list_default_anamnesis: 'logical',
                name_anamnesis: '',
                notes_anamnesis: '',
                options_anamnesis: 'yes',
                type_anamnesis: {
                    value: '',
                    label: '',
                },
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, handleSubmit, values }) => (
                <Form
                    onSubmit={handleSubmit}
                    className="gap-2 flex flex-col card shadow-2xl p-8 border-primary-500 border-2"
                >
                    <h1 className="text-center font-sans font-semibold text-base capitalize">
                        Questão de Anamnese
                        <br />
                    </h1>
                    <FieldControlSelect
                        ctx={values}
                        name="type_anamnesis"
                        required
                        label="Questão"
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

                    <BtnConfirm
                        disabled={!isValid}
                        className="w-full text-white"
                        label="Responder"
                        type="submit"
                    />
                </Form>
            )}
        </Formik>
    );
};

export default CardInputAnamnese;
