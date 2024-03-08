import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import RadioGroup from '~/Components/molecules/radio-group'
import type { ExamTest } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const ExamTestForm = ({
    item = {} as ExamTest,
    handleSubmit,
    handleClose,
}: OptionFormsProps<ExamTest>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'exams',
                    date_exam: '',
                    health_insurance: '',
                    local: '',
                    notes: '',
                    status_exam: 'not_applicable',
                    time_date: '',
                    name: '',
                    value: 0,
                    type_object: '',
                    url_document: '',
                    ...item,
                } as ExamTest
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit, isValid }) => (
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
                    <FieldControl
                        ctx={values}
                        label="Plano de Saúde"
                        name="health_insurance"
                    />
                    <FieldControl
                        ctx={values}
                        label="Data de Exame"
                        type="date"
                        name="date_exam"
                    />
                    <FieldControl ctx={values} label="Local" name="local" />
                    <RadioGroup
                        ctx={values}
                        name="status_exam"
                        title="Estado de Exame"
                        checked={values?.status_exam}
                        items={[
                            {
                                value: 'pending',
                                name: 'Pendente',
                            },
                            {
                                value: 'done',
                                name: 'Finalizado',
                            },
                            {
                                value: 'canceled',
                                name: 'Cancelado',
                            },
                            {
                                value: 'in_progress',
                                name: 'Em andamento',
                            },
                            {
                                value: 'not_applicable',
                                name: 'Não se aplica',
                            },
                        ]}
                    />
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

export default ExamTestForm
