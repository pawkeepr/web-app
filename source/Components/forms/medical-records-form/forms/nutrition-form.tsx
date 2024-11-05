import { Form, Formik } from 'formik'
import { FaAppleAlt } from 'react-icons/fa'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import Label from '~/Components/atoms/label'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
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

                        <div className="flex items-center gap-2 text-xs ">
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

export default NutritionForm

export const NutritionFormModal = ({
    item = {} as Nutrition,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<Nutrition>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-amber-50"
                >
                    <div className="p-4 rounded-full bg-amber-100">
                        <FaAppleAlt className="text-4xl text-amber-500" />
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

                <NutritionForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}
