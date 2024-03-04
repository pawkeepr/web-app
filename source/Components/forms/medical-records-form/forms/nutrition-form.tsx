import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import Label from '~/Components/atoms/label'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import type { Nutrition } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const NutritionForm = ({
    item = {} as Nutrition,
    handleSubmit,
    handleClose,
}: OptionFormsProps<Nutrition>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'nutritions',
                    url_document: '',
                    name: '',
                    notes: '',
                    type_object: '',
                    value: '',
                    amount: '',
                    interval: '',
                    measure: '',
                    period: '',
                    start_time: '',
                    starting_date: new Date().toISOString(),
                    ...item,
                } as Nutrition
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
                    <div>
                        <Label label="Inicio" />

                        <div className="flex gap-2 items-center text-xs ">
                            <FieldControl
                                ctx={values}
                                name="starting_date"
                                type="date"
                                minDate={values?.starting_date}
                            />
                            às
                            <FieldControl
                                ctx={values}
                                name="start_time"
                                type="time"
                            />
                        </div>
                    </div>

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

export default NutritionForm
