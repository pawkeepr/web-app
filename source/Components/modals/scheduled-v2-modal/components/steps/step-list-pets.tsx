import { BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import IconSpecie from '~/Components/atoms/icon-specie'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldControl from '~/Components/molecules/field-control/field-control'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { KeysIconPets } from '~/types/speciesType'
import { NUMBER_STEPS } from '../../modal-list-pets'
import type { CtxSimplifiedPeTFields, StepProps } from '../../types'
import { option } from '../helpers'

const StepListPets = ({
    nextStep,
    pets,
    onChangeStep,
    isLoading,
    onChangePet,
}: StepProps) => {
    const { values } = useFormikContextSafe<CtxSimplifiedPeTFields>()

    return (
        <div className="flex-1 flex mobile:h-[95vh] h-[80vh]  w-full  justify-between items-center flex-col">
            <h5 className="mb-2 font-semibold text-center text-gray-500">
                Selecione ou Adicione um Pet para prosseguir na consulta.
            </h5>
            <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 py-1 overflow-auto">
                {pets?.length === 0 && (
                    <div className="flex items-center justify-center ">
                        <span className="text-base font-semibold text-center text-gray-500">
                            {isLoading ? 'Carregando...' : 'Nenhum pet encontrado'}
                        </span>
                    </div>
                )}
                {pets?.map((pet) => (
                    <button
                        key={pet.id}
                        type="button"
                        onClick={() => {
                            onChangePet(pet)
                            onChangeStep(NUMBER_STEPS.CHOICE)
                        }}
                        className={option()}
                    >
                        <div className="grid items-center justify-center grid-cols-4">
                            <span className="col-span-1 align-middle">
                                <IconSpecie
                                    specie={
                                        pet.pet_information?.specie as KeysIconPets
                                    }
                                />
                            </span>
                            <span className="col-span-2 align-middle">
                                {pet.pet_information?.name_pet}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="w-full mb-2">
                <FieldControl
                    ctx={values}
                    name="name"
                    label="Caso o pet não esteja na lista, digite o nome dele para prosseguir:"
                    className="w-full mb-1 "
                    placeholder="Nome do Pet"
                />

                <BoxButtons
                    isValid={values?.name?.length > 0}
                    link={false}
                    cancel={(props) => (
                        <BtnLink
                            {...(props as any)}
                            message="Cadastro Completo"
                            className="flex items-center justify-center w-1/2 h-11"
                            href={`/veterinary/pet?document=${values?.ownerEmergencyContact?.cpf_cnpj}`}
                        />
                    )}
                    success={(props) => (
                        <BtnPrimary {...props} label="Cadastro Simplificado" />
                    )}
                    onClickSuccess={nextStep}
                />
            </div>
        </div>
    )
}

export default StepListPets
