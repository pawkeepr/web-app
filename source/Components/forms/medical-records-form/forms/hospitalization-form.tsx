import { Form, Formik } from 'formik'
import { BsHospital } from 'react-icons/bs'
import { FaCut } from 'react-icons/fa'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import Label from '~/Components/atoms/label'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import type { Hospitalization } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const HospitalizationForm = ({
    item = {} as Hospitalization,
    handleSubmit,
    handleClose,
}: Omit<OptionFormsProps<Hospitalization>, 'pet'>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'hospitalizations',
                    url_document: '',
                    name: '',
                    notes: '',
                    type_object: '',
                    value: '',
                    appointment_date: new Date().toISOString(),
                    date: new Date().toISOString(),
                    health_insurance: '',
                    local: '',
                    time_date: new Date().toISOString(),
                    ...item,
                } as Hospitalization
            }
            onSubmit={handleSubmit}
        >
            {({ values, handleSubmit, isValid }) => (
                <Form
                    className="grid grid-cols-2 gap-1 mobile:grid-cols-1"
                    onSubmit={handleSubmit}
                >
                    <FieldControl ctx={values} label="Local" name="local" />
                    <FieldControl
                        ctx={values}
                        label="Plano de Saúde"
                        name="health_insurance"
                    />
                    <div>
                        <Label label="Inicio" />
                        <div className="flex items-center gap-2 text-xs ">
                            <FieldControl
                                ctx={values}
                                name="date_start"
                                type="date"
                            />
                            às
                            <FieldControl
                                ctx={values}
                                name="time_start"
                                type="time"
                            />
                        </div>
                    </div>
                    <div>
                        <Label label="Fim" />

                        <div className="flex items-center gap-2 text-xs ">
                            <FieldControl
                                ctx={values}
                                name="date_end"
                                type="date"
                                minDate={values?.date_start}
                            />
                            às
                            <FieldControl
                                ctx={values}
                                name="time_end"
                                type="time"
                            />
                        </div>
                    </div>
                    <FieldTextArea
                        ctx={values}
                        label="Notas"
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

export default HospitalizationForm

export const HospitalizationFormModal = ({
    item = {} as Hospitalization,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<Hospitalization>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-indigo-50"
                >
                    <div className="p-4 bg-indigo-100 rounded-full">
                        <BsHospital className="text-4xl text-indigo-500" />
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

                <HospitalizationForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}

export const InternmentsFormModal = ({
    item = {} as Hospitalization,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<Hospitalization>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-lime-50"
                >
                    <div className="p-4 rounded-full bg-lime-100">
                        <BsHospital className="text-4xl text-lime-500" />
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

                <HospitalizationForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}

export const SurgeriesFormModal = ({
    item = {} as Hospitalization,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<Hospitalization>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-pink-50"
                >
                    <div className="p-4 bg-pink-100 rounded-full">
                        <FaCut className="text-4xl text-pink-500" />
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

                <HospitalizationForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}
