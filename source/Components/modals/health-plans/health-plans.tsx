import { TrashIcon } from '@heroicons/react/24/solid'
import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import withCompose from '~/Components/helpers/with-compose'
import FieldControl from '~/Components/molecules/field-control'
import FieldDate from '~/Components/molecules/field-date'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import {
    handleSubmitHealthPlans,
    useDeleteHealthPlansMutation,
} from '~/store/hooks/health-plans'
import { validationSchema, type IHealthPlan } from '~/validations/health-plans'
import ConfirmModal from '../confirm-modal'

type ModalHealthPlansProps = {
    children?: (showModal: () => void) => JSX.Element
    healthPlan?: IHealthPlan | null
    id_pet: string
}

const ModalHealthPlans = ({
    children,
    healthPlan = null,
    id_pet,
}: ModalHealthPlansProps) => {
    const { closeModal, open, showModal } = useModal()
    const { mutateAsync, isPending } = useDeleteHealthPlansMutation(
        id_pet,
        healthPlan?.number_health as string,
    )
    const handleSubmit = handleSubmitHealthPlans({
        id_pet,
        number_health: healthPlan?.number_health,
        finallySubmit: closeModal,
    })

    const handleDelete = async () => {
        await mutateAsync()
        closeModal()
    }

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
                    {({ values, isSubmitting, isValid, initialValues }) => (
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
                                    placeholderText="dd/mm/aaaa"
                                    label="Data de Início"
                                />
                                <FieldDate
                                    ctx={values}
                                    name="dat_end"
                                    placeholderText="dd/mm/aaaa"
                                    label="Data de Fim"
                                    minDate={values?.dat_ini as unknown as Date}
                                />
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                                <ConfirmModal
                                    onConfirm={handleDelete}
                                    title="Deletar Plano"
                                >
                                    {(showModal) => (
                                        <BtnCancel
                                            disabled={isSubmitting || !isValid}
                                            condition={
                                                !isSubmitting &&
                                                !!initialValues?.number_health &&
                                                !isPending
                                            }
                                            type="button"
                                            outline
                                            // icone de lixeira
                                            icon={<TrashIcon className="w-5 h-5" />}
                                            className="flex-1 flex-grow w-full text-red-400 border-red-400 hover:text-red-500 hover:border-red-500"
                                            onClick={showModal}
                                            label="Deletar"
                                        />
                                    )}
                                </ConfirmModal>

                                <BtnPrimary
                                    type="submit"
                                    label="Salvar"
                                    className="flex-1 flex-grow w-full"
                                    disabled={isSubmitting || !isValid}
                                    isLoading={isSubmitting || isPending}
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
