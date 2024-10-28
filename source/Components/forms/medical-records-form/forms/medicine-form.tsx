import { Form, Formik } from 'formik'
import { FaPills } from 'react-icons/fa'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import ControlToggle3States from '~/Components/molecules/control-toggle-3-states'
import FieldControl from '~/Components/molecules/field-control'
import FieldNumber from '~/Components/molecules/field-number'
import FieldTextArea from '~/Components/molecules/field-text-area'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import type { Medicine } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const MedicineForm = ({
    item = {} as Medicine,
    handleSubmit,
    handleClose,
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
                    continuous_use: 'no',
                    date_end: new Date().toISOString(),
                    date_init: new Date().toISOString(),
                    interval: '',
                    period: '',
                    ...item,
                } as Medicine
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

                    <FieldNumber
                        ctx={values}
                        label="Período (em Dias)"
                        name="period"
                    />
                    <FieldNumber
                        ctx={values}
                        label="Intervalo (em Horas)"
                        name="interval"
                    />

                    <FieldControl
                        ctx={values}
                        label="Data de Inicio"
                        type="date"
                        name="date_init"
                    />

                    <FieldControl
                        ctx={values}
                        label="Data de Fim"
                        type="date"
                        minDate={values?.date_init}
                        name="date_end"
                    />
                    <ControlToggle3States
                        ctx={values}
                        name="continuous_use"
                        label="Uso Contínuo"
                        divClassName="col-span-full"
                    />

                    <FieldTextArea
                        ctx={values}
                        label="Descreva o Uso"
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

export default MedicineForm

export const MedicationsFormModal = ({
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-purple-50"
                >
                    <div className="p-4 bg-purple-100 rounded-full">
                        <FaPills className="text-4xl text-purple-500" />
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

                <MedicineForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}
