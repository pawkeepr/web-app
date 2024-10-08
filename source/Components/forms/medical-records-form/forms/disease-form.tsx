import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { Disease } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const DiseaseForm = ({
    item = {} as Disease,
    handleSubmit,
    handleClose,
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
            {({ values, handleSubmit, isValid }) => (
                <Form
                    className="grid grid-cols-1 gap-1 mobile:grid-cols-1"
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
                        name="notes"
                        divClassName="col-span-full"
                    />
                    <div className="flex flex-1 justify-end col-span-full">
                        <BtnCancel
                            className="flex-1"
                            label="Cancelar"
                            onClick={handleClose}
                        />

                        <BtnPrimary
                            className="flex-1 text-white"
                            label="Adicionar"
                            type="submit"
                            disabled={!isValid}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default DiseaseForm
