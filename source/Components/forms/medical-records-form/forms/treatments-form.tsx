import { Form, Formik } from 'formik'
import { FaWeight } from 'react-icons/fa'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
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

export const TreatmentsFormModal = ({
    item = {} as Medicine,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<Medicine>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-green-50"
                >
                    <div className="p-4 bg-green-100 rounded-full">
                        <FaWeight className="text-4xl text-green-500" />
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

                <TreatmentsForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}
