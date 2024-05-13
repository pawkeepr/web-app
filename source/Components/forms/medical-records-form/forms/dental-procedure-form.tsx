import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import ControlToggle3States from '~/Components/molecules/control-toggle-3-states'
import FieldTextArea from '~/Components/molecules/field-text-area'
import RadioGroup from '~/Components/molecules/radio-group'
import type { DentalProcedure } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const DentalProcedureForm = ({
    item = {} as DentalProcedure,
    handleSubmit,
    handleClose,
}: OptionFormsProps<DentalProcedure>) => {
    return (
        <Formik
            initialValues={
                {
                    status_dental: '',
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    name: '',
                    notes: '',
                    value: '',
                    type_profile: 1,
                    who_applied: '',
                    type: 'dental-procedures',
                    anesthesia_required: false,
                    follow_up_required: false,
                    need_dental_cleaning: false,
                    recommended_treatment: '',
                    url_document: '',
                    ...item,
                } as DentalProcedure
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit, isValid }) => (
                <Form
                    className="grid grid-cols-1 gap-1 mobile:grid-cols-1"
                    onSubmit={handleSubmit}
                >
                    <RadioGroup
                        ctx={values}
                        name="status_dental"
                        title="Estado Dentário"
                        checked={values?.status_dental}
                        items={[
                            {
                                value: 'good',
                                name: 'Bom',
                            },
                            {
                                value: 'regular',
                                name: 'Regular',
                            },
                            {
                                value: 'bad',
                                name: 'Ruim',
                            },
                        ]}
                    />

                    <ControlToggle3States
                        ctx={values}
                        name="follow_up_required"
                        label="Retorno necessário?"
                    />

                    <ControlToggle3States
                        ctx={values}
                        name="anesthesia_required"
                        label="Anestesia necessária?"
                    />

                    <ControlToggle3States
                        ctx={values}
                        name="need_dental_cleaning"
                        label="Necessita de limpeza dentária?"
                    />

                    <FieldTextArea
                        ctx={values}
                        label="Recomendações de Tratamento"
                        name="notes"
                        divClassName="col-span-full"
                    />
                    <div className="flex justify-end flex-1 col-span-full">
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

export default DentalProcedureForm
