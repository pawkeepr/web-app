import { Form, Formik } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import { InputDate } from '~/Components/atoms/input-date'
import withCompose from '~/Components/helpers/with-compose'
import FieldControl from '~/Components/molecules/field-control'
import Modal from '~/Components/organism/modal'
import useModal from '~/hooks/use-modal'
import type { IHealthPlan } from '~/services/helpers/health-plans'

type ModalHealthPlansProps = {
    children?: (showModal: () => void) => JSX.Element
    healthPlan: IHealthPlan
}

const ModalHealthPlans = ({ children, healthPlan }: ModalHealthPlansProps) => {
    const { closeModal, open, showModal } = useModal()

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
                    modal: 'w-fit h-fit rounded-3xl overflow-visible',
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
                    onSubmit={() => {}}
                >
                    <Form className="flex flex-col p-4 space-y-1">
                        <h2 className="text-xl font-semibold text-center text-gray-800">
                            {healthPlan
                                ? 'Editar Plano de Saúde'
                                : 'Adicionar Plano de Saúde'}
                        </h2>
                        <FieldControl
                            ctx={healthPlan}
                            name="name"
                            label="Nome do Plano"
                        />

                        <FieldControl
                            ctx={healthPlan}
                            name="type_health"
                            label="Tipo de Plano"
                            placeholder="Digite o tipo de plano"
                        />
                        <FieldControl
                            ctx={healthPlan}
                            name="number_health"
                            label="Número do Plano"
                            placeholder="Digite o número do plano"
                        />
                        <InputDate
                            onChange={
                                (date: Date) => {
                                    console.log(date)
                                }
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            }
                            name="validity"
                        />
                        <FieldControl
                            ctx={healthPlan}
                            name="dat_ini"
                            label="Data de Início"
                            type="date"
                        />
                        <FieldControl
                            ctx={healthPlan}
                            name="dat_end"
                            label="Data de Fim"
                            type="date"
                        />
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <BtnCancel
                                type="button"
                                onClick={() => closeModal()}
                                label="Cancelar"
                            />
                            <BtnPrimary type="submit" label="Salvar" />
                        </div>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}

export default withCompose(ModalHealthPlans)
