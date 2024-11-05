import { Form, Formik } from 'formik'
import { FaTooth } from 'react-icons/fa'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import ControlToggle3States from '~/Components/molecules/control-toggle-3-states'
import FieldTextArea from '~/Components/molecules/field-text-area'
import RadioGroup from '~/Components/molecules/radio-group'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
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

export const DentalProcedureFormModal = ({
    item = {} as DentalProcedure,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<DentalProcedure>, 'pet'> & {
    children?: (showModal: () => void) => void
}) => {
    const { closeModal, open, showModal } = useModal()
    const title = 'Adicionar Registro'

    return (
        <>
            {children?.(showModal) || (
                <button
                    onClick={showModal}
                    type="button"
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-teal-50"
                >
                    <div className="p-4 bg-teal-100 rounded-full">
                        <FaTooth className="text-4xl text-teal-500" />
                    </div>
                    <div className="ml-4 text-start">
                        <h2 className="text-lg font-bold text-gray-700">
                            Adicionar Registro
                        </h2>
                    </div>
                </button>
            )}
            <Modal onClose={() => closeModal()} open={open}>
                <div className="w-full">
                    <h6 className="mb-4 font-semibold text-center uppercase">
                        {title}
                    </h6>
                </div>

                <DentalProcedureForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}
