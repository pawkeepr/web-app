import { Form, Formik } from 'formik'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { Medicine } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const TreatmentsForm = ({
    item = {} as Medicine,
    handleSubmit,
}: OptionFormsProps<Medicine>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'medicines',
                    url_document: '',
                    name: '',
                    notes: '',
                    type_object: '',
                    value: '',
                    amount: '',
                    brand: '',
                    continuous_use: false,
                    date_end: new Date().toISOString(),
                    date_init: new Date().toISOString(),
                    interval: '',
                    period: '',
                    ...item,
                } as Medicine
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit }) => (
                <Form
                    className="grid grid-cols-2 gap-1 mobile:grid-cols-1"
                    onSubmit={handleSubmit}
                >
                    <FieldControl
                        ctx={values}
                        label="Nome"
                        required
                        name="name"
                        divClassName="col-span-full"
                    />

                    <FieldTextArea
                        ctx={values}
                        label="Observações"
                        name="notes"
                        divClassName="col-span-full"
                    />
                </Form>
            )}
        </Formik>
    )
}

export default TreatmentsForm
