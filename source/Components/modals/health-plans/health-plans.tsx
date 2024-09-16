import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import withCompose from '~/Components/helpers/with-compose'
import FieldControl from '~/Components/molecules/field-control'
import FieldDate from '~/Components/molecules/field-date'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import { handleSubmitHealthPlans } from '~/store/hooks/health-plans'
import { validationSchema, type IHealthPlan } from '~/validations/health-plans'

type ModalHealthPlansProps = {
    children?: (showModal: () => void) => JSX.Element
    healthPlan?: IHealthPlan
    id_pet: string
}

const ModalHealthPlans = ({
    children,
    healthPlan = null,
    id_pet,
}: ModalHealthPlansProps) => {
    const { closeModal, open, showModal } = useModal()
    const handleSubmit = handleSubmitHealthPlans({ id_pet })
    return (
        <>
            {children?.(showModal)}
            {!children && (
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => showModal()}
                        className="px-4 py-2 text-sm font-medium text-white rounded-md bg-secondary-500 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                        Planos de Saúde
                    </button>
                </div>
            )}

            <Modal
                onClose={() => closeModal()}
                open={open}
                mobilePage={false}
                classNames={{
                    modal: 'min-w-fit w-[640px] h-fit rounded-3xl overflow-visible',
                }}
            >
                <Formik
                    enableReinitialize
                    initialValues={{
                        id: healthPlan?.id || '',
                        name: healthPlan?.name || '',
                        type_health: healthPlan?.type_health || '',
                        number_health: healthPlan?.number_health || '',
                        validity: healthPlan?.validity || '',
                        dat_ini: healthPlan?.dat_ini || '',
                        dat_end: healthPlan?.dat_end || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, isSubmitting, isValid }) => (
                        <Form className="flex flex-col p-4 space-y-1">
                            <h2 className="text-xl font-semibold text-center text-gray-800">
                                {values
                                    ? 'Editar Plano de Saúde'
                                    : 'Adicionar Plano de Saúde'}
                            </h2>
                            <FieldControl
                                ctx={values}
                                name="name"
                                label="Nome do Plano"
                            />
                            <div className="flex gap-2">
                                <FieldControl
                                    ctx={values}
                                    name="type_health"
                                    label="Tipo de Plano"
                                    placeholder="Digite o tipo de plano"
                                />
                                <FieldControl
                                    ctx={values}
                                    name="number_health"
                                    label="Número do Plano"
                                    placeholder="Digite o número do plano"
                                />
                            </div>
                            <FieldDate
                                ctx={values}
                                name="validity"
                                label="Data de Validade"
                            />
                            <div className="flex gap-2">
                                <FieldDate
                                    ctx={values}
                                    name="dat_ini"
                                    label="Data de Início"
                                />
                                <FieldDate
                                    ctx={values}
                                    name="dat_end"
                                    label="Data de Fim"
                                    minDate={values?.dat_ini as unknown as Date}
                                />
                            </div>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <BtnCancel
                                    disabled={isSubmitting || !isValid}
                                    condition={!isSubmitting}
                                    type="button"
                                    onClick={() => closeModal()}
                                    label="Cancelar"
                                />
                                <BtnPrimary
                                    type="submit"
                                    label="Salvar"
                                    disabled={isSubmitting || !isValid}
                                    isLoading={isSubmitting}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}

export default withCompose(ModalHealthPlans)
