import { Form, Formik } from 'formik'
import { FaVial } from 'react-icons/fa'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import FieldTextArea from '~/Components/molecules/field-text-area'
import RadioGroup from '~/Components/molecules/radio-group'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import type { ExamTest } from '~/types/medical-records'
import type { OptionFormsProps } from '../medical-records-form'

const ExamTestForm = ({
    item = {} as ExamTest,
    handleSubmit,
    handleClose,
}: OptionFormsProps<ExamTest>) => {
    return (
        <Formik
            initialValues={
                {
                    coin: '',
                    cpf_cnpj_who_applied: '',
                    date_application: new Date().toISOString(),
                    type_profile: 1,
                    who_applied: '',
                    type: 'exams',
                    date_exam: '',
                    health_insurance: '',
                    local: '',
                    notes: '',
                    status_exam: 'not_applicable',
                    time_date: '',
                    name: '',
                    value: '0',
                    type_object: '',
                    url_document: '',
                    ...item,
                } as ExamTest
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
                    <FieldControl
                        ctx={values}
                        label="Plano de Saúde"
                        name="health_insurance"
                    />
                    <FieldControl
                        ctx={values}
                        label="Data de Exame"
                        type="date"
                        name="date_exam"
                    />
                    <FieldControl ctx={values} label="Local" name="local" />
                    <RadioGroup
                        ctx={values}
                        name="status_exam"
                        title="Estado de Exame"
                        checked={values?.status_exam}
                        items={[
                            {
                                value: 'pending',
                                name: 'Pendente',
                            },
                            {
                                value: 'done',
                                name: 'Finalizado',
                            },
                            {
                                value: 'canceled',
                                name: 'Cancelado',
                            },
                            {
                                value: 'in_progress',
                                name: 'Em andamento',
                            },
                            {
                                value: 'not_applicable',
                                name: 'Não se aplica',
                            },
                        ]}
                    />
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

export default ExamTestForm

export const ExamTestFormModal = ({
    item = {} as ExamTest,
    handleSubmit,
    handleClose,
    children,
}: Omit<OptionFormsProps<ExamTest>, 'pet'> & {
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
                    className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-cyan-50"
                >
                    <div className="p-4 rounded-full bg-cyan-100">
                        <FaVial className="text-4xl text-cyan-500" />
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

                <ExamTestForm
                    handleSubmit={handleSubmit}
                    item={item}
                    handleClose={handleClose}
                />
            </Modal>
        </>
    )
}
