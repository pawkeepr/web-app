import { Form, Formik } from 'formik'
import { FaSyringe } from 'react-icons/fa'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
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
                    <FieldControl
                        ctx={values}
                        label="Nome"
                        required
                        name="name"
                        divClassName="col-span-full"
                    />

                    <FieldControl ctx={values} label="Marca" name="brand" />
                    <FieldControl ctx={values} label="Lote" name="batch" />

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

export default VaccinesForm

export const VaccinesFormModal = ({
    item = {} as Vaccine,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<Vaccine>, 'pet'> & {
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
                        <FaSyringe className="text-4xl text-green-500" />
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

                <VaccinesForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}
