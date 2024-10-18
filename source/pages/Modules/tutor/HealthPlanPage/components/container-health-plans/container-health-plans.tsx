import { FaHeartbeat, FaPlus } from 'react-icons/fa'
import ModalHealthPlans from '~/Components/modals/health-plans'
import { useSelectedPet } from '~/hooks/use-selected-pet'
import { useHealthPlans } from '~/store/hooks/health-plans'
import type { IHealthPlan } from '~/validations/health-plans'
const CardHealthPlans = ({ healthPlan }: { healthPlan: IHealthPlan }) => {
    return (
        <div className="flex items-center w-full p-6 rounded-lg shadow-theme-3">
            <div className="p-4 bg-blue-100 rounded-full">
                <FaHeartbeat className="text-4xl text-blue-500" />
            </div>
            <div className="ml-4 text-start">
                <h2 className="text-lg font-bold text-gray-700">
                    {healthPlan.name}
                </h2>
                <p className="text-gray-600">{healthPlan.type_health}</p>
                <p className="text-gray-600">
                    <strong>Validade:</strong>{' '}
                    {Intl.DateTimeFormat('pt-BR').format(
                        new Date(healthPlan.validity),
                    )}
                </p>
            </div>
        </div>
    )
}

const ContainerHealthPlans = () => {
    const { pet } = useSelectedPet()

    const id_pet = pet?.id

    if (!id_pet)
        return (
            <p className="text-base font-semibold text-center text-gray-600">
                Selecione um Pet para ver os Dados
            </p>
        )

    const { data, isPending, isError } = useHealthPlans({ id_pet })

    return (
        <>
            <ModalHealthPlans id_pet={id_pet}>
                {(showModal) => (
                    <button
                        type="button"
                        onClick={() => showModal()}
                        className="flex items-center w-full p-6 font-sans border-2 border-blue-400 border-dashed rounded-lg cursor-pointer shadow-theme-7 bg-gray-50 hover:bg-gray-100"
                    >
                        <div className="relative flex items-center justify-center p-4 bg-blue-200 rounded-full ">
                            <div className="relative w-fit">
                                <FaHeartbeat className="text-4xl text-blue-600 " />
                                <FaPlus className="absolute bottom-0 right-0 ml-1 text-sm text-white " />
                            </div>
                        </div>
                        <div className="ml-4 text-left">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Adicionar Plano de Saúde
                            </h2>
                            <p className="text-gray-600">
                                Clique para adicionar um novo plano de saúde ao seu
                                Pet.
                            </p>
                        </div>
                    </button>
                )}
            </ModalHealthPlans>

            {isPending && <div>Loading...</div>}

            {isError && <div>Error, tente novamente</div>}

            {data && data?.length > 0 && (
                <div className="space-y-4">
                    {data?.map((plan: IHealthPlan) => (
                        <ModalHealthPlans
                            key={plan.number_health}
                            id_pet={id_pet}
                            healthPlan={plan}
                        >
                            {(showModal) => (
                                <button
                                    type="button"
                                    onClick={() => showModal()}
                                    className="w-full rounded-lg bg-gray-50 shadow-theme-7 hover:bg-gray-100"
                                >
                                    <CardHealthPlans
                                        key={plan.number_health}
                                        healthPlan={plan}
                                    />
                                </button>
                            )}
                        </ModalHealthPlans>
                    ))}
                </div>
            )}
        </>
    )
}

export default ContainerHealthPlans
