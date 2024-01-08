import { Form, Formik, FormikHelpers } from 'formik';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { BtnConfirm } from '~/Components/atoms/btn';
import FieldControl from '~/Components/molecules/field-control';
import FieldControlSelect from '~/Components/molecules/field-control/field-control-select';
import FieldTextArea from '~/Components/molecules/field-text-area';
import { OptionSelect } from '~/store/slices/appointment-vet/types';
import { QuestionAnamnesis } from '~/types/appointment';
import { RecordsShapeYup } from '~/types/helpers';

type CardInputProps = {
    items?: OptionSelect[];
    handleSubmit?: (
        data: QuestionAnamnesis,
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        formikHelpers: FormikHelpers<any>,
    ) => Promise<unknown>;
};

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

const makeOptions = (items: OptionSelect[]) => {
    return items.map((item) => ({
        value: item.value,
        label: item.label,
        color: 'rgb(255 200 107);',
    }));
};

const CardInputAnamnese = ({
    items = [],
    handleSubmit = async (data: QuestionAnamnesis) => {
        console.log('handleSubmit');
    },
}: CardInputProps) => {
    const options = useMemo(() => makeOptions(items), [items]);

    return (
        <Formik
            initialValues={{
                list_notes_anamnesis: [] as string[],
                logical_list_default_anamnesis: '',
                name_anamnesis: '',
                notes_anamnesis: '',
                options_anamnesis: '',
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
                    <FieldControlSelect
                        ctx={values}
                        name="type_anamnesis"
                        required
                        label="Tipo"
                        options={options}
                    />
                    <FieldControl
                        ctx={values}
                        name="name_anamnesis"
                        label="Nome"
                        required
                    />
                    <FieldTextArea
                        ctx={values}
                        name={'notes_anamnesis'}
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
    );
};

export default CardInputAnamnese;
