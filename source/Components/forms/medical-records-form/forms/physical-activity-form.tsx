import { Form, Formik } from 'formik'
import { FaRunning } from 'react-icons/fa'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import ControlToggle3States from '~/Components/molecules/control-toggle-3-states'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import type { PhysicalActivity } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const PhysicalActivityForm = ({
    item = {} as PhysicalActivity,
    handleSubmit,
    handleClose,
}: OptionFormsProps<PhysicalActivity>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'physical-activities',
                    url_document: '',
                    name: '',
                    notes: '',
                    type_object: '',
                    value: '',
                    amount: '',
                    continuously: false,
                    date_end: '',
                    date_init: '',
                    ...item,
                } as PhysicalActivity
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
                    <FieldControl ctx={values} name="date_init" type="date" />
                    <FieldControl
                        ctx={values}
                        name="date_end"
                        type="date"
                        minDate={values?.date_init}
                    />

                    <ControlToggle3States
                        ctx={values}
                        name="continuously"
                        label="Continuo"
                        divClassName="col-span-full"
                    />

                    <FieldTextArea
                        ctx={values}
                        label="Observações"
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

export default PhysicalActivityForm

export const PhysicalActivityFormModal = ({
    item = {} as PhysicalActivity,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<PhysicalActivity>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-yellow-50"
                >
                    <div className="p-4 bg-yellow-100 rounded-full">
                        <FaRunning className="text-4xl text-yellow-500" />
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

                <PhysicalActivityForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}
