import { FaHeartbeat, FaPlus } from 'react-icons/fa'
import ModalHealthPlans from '~/Components/modals/health-plans'
import type { IHealthPlan } from '~/services/helpers/health-plans'
import { useHealthPlans } from '~/store/hooks/health-plans'

const CardHealthPlans = () => {
    return (
        <div className="flex items-center w-full p-6 bg-white rounded-lg shadow-theme-3">
            <div className="p-4 bg-blue-100 rounded-full">
                <FaHeartbeat className="text-4xl text-blue-500" />
            </div>
            <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Plano de Saúde
                </h2>
                <p className="text-gray-600">
                    Proteja sua saúde com nossos planos personalizados.
                </p>
            </div>
        </div>
    )
}

type ContainerHealthPlansProps = {
    id_pet: string
}
const ContainerHealthPlans = ({ id_pet }: ContainerHealthPlansProps) => {
    if (!id_pet) return null

    const { data, isPending, isError } = useHealthPlans({ id_pet })

    return (
        <>
            <ModalHealthPlans>
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
                <div>
                    {data?.map((plan: IHealthPlan) => (
                        <CardHealthPlans key={plan.id} />
                    ))}
                </div>
            )}
        </>
    )
}

export default ContainerHealthPlans
