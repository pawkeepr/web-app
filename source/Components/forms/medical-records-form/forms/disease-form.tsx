import { Form, Formik } from 'formik'
import { FaAllergies, FaBandAid, FaHeartbeat } from 'react-icons/fa'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
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

export default DiseaseForm

export const DiseaseFormModal = ({
    item = {} as Disease,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<Disease>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-red-50"
                >
                    <div className="p-4 bg-red-100 rounded-full">
                        <FaHeartbeat className="text-4xl text-red-500" />
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

                <DiseaseForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}

export const InjuriesFormModal = ({
    item = {} as Disease,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<Disease>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-red-50"
                >
                    <div className="p-4 bg-red-100 rounded-full">
                        <FaBandAid className="text-4xl text-red-500" />
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

                <DiseaseForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}

export const AllergiesFormModal = ({
    item = {} as Disease,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<Disease>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-orange-50"
                >
                    <div className="p-4 bg-orange-100 rounded-full">
                        <FaAllergies className="text-4xl text-orange-500" />
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

                <DiseaseForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}
