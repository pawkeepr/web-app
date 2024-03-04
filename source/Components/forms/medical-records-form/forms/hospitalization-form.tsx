import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import Label from '~/Components/atoms/label'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { Hospitalization } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const HospitalizationForm = ({
    item = {} as Hospitalization,
    handleSubmit,
    handleClose,
}: OptionFormsProps<Hospitalization>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'hospitalizations',
                    url_document: '',
                    name: '',
                    notes: '',
                    type_object: '',
                    value: '',
                    appointment_date: new Date().toISOString(),
                    date: new Date().toISOString(),
                    health_insurance: '',
                    local: '',
                    time_date: new Date().toISOString(),
                    ...item,
                } as Hospitalization
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit, isValid }) => (
                <Form
                    className="grid grid-cols-2 gap-1 mobile:grid-cols-1"
                    onSubmit={handleSubmit}
                >
                    <FieldControl ctx={values} label="Local" name="local" />
                    <FieldControl
                        ctx={values}
                        label="Plano de Saúde"
                        name="health_insurance"
                    />
                    <div>
                        <Label label="Inicio" />
                        <div className="flex gap-2 items-center text-xs ">
                            <FieldControl
                                ctx={values}
                                name="date_start"
                                type="date"
                            />
                            às
                            <FieldControl
                                ctx={values}
                                name="time_start"
                                type="time"
                            />
                        </div>
                    </div>
                    <div>
                        <Label label="Fim" />

                        <div className="flex gap-2 items-center text-xs ">
                            <FieldControl
                                ctx={values}
                                name="date_end"
                                type="date"
                                minDate={values?.date_start}
                            />
                            às
                            <FieldControl
                                ctx={values}
                                name="time_end"
                                type="time"
                            />
                        </div>
                    </div>
                    <FieldTextArea
                        ctx={values}
                        label="Notas"
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

export default HospitalizationForm
