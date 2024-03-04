import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { Vaccine } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const VaccinesForm = ({
    item = {} as Vaccine,
    handleSubmit,
    handleClose,
}: OptionFormsProps<Vaccine>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'vaccines',
                    url_document: '',
                    name: '',
                    notes: '',
                    type_object: '',
                    value: '',
                    batch: '',
                    brand: '',
                    date_next_application: new Date().toISOString(),
                    dose: '',
                    health_insurance: '',
                    local: '',
                    ...item,
                } as Vaccine
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit, isValid }) => (
                <Form
                    className="grid grid-cols-2 gap-1 mobile:grid-cols-1"
                    onSubmit={handleSubmit}
                >
                    <FieldControl ctx={values} label="Nome" required name="name" />

                    <FieldControl ctx={values} label="Marca" name="brand" />

                    <FieldControl
                        ctx={values}
                        label="Data de Aplicação"
                        type="date"
                        name="date_application"
                    />

                    <FieldControl
                        ctx={values}
                        label="Data de Próxima Aplicação"
                        type="date"
                        name="date_next_application"
                    />

                    <FieldControl
                        ctx={values}
                        label="Plano de Saúde"
                        name="health_insurance"
                    />

                    <FieldTextArea
                        ctx={values}
                        label="Observações"
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

export default VaccinesForm
