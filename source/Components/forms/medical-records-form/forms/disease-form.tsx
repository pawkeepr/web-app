import { Form, Formik } from 'formik'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { Disease } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const DiseaseForm = ({
    item = {} as Disease,
    handleSubmit,
}: OptionFormsProps<Disease>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'diseases',
                    recommended_treatment: '',
                    url_document: '',
                    appointment_date: new Date().toISOString(),
                    name: '',
                    notes: '',
                    type_object: '',
                    value: '',
                    when_agreements_date: '',
                    ...item,
                } as Disease
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit }) => (
                <Form
                    className="grid grid-cols-1 gap-3 mobile:grid-cols-1"
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
                        label="Recomendações de Tratamento"
                        required
                        name="notes"
                        divClassName="col-span-full"
                    />
                </Form>
            )}
        </Formik>
    )
}

export default DiseaseForm
