import { useFormikContext } from 'formik'
import { BtnLink, BtnPrimary } from '~/Components/atoms/btn'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import FieldControl from '~/Components/molecules/field-control/field-control'
import { KeyOfMapOptionSpecies, MapOptionSpecies, Species } from '~/store/slices/pets/speciesType'
import { InitialValues, StepProps } from '../../types'
import { option } from '../helpers'

enum EmojiPet {
    cat = '🐱',
    dog = '🐶',
    rabbit = '🐰',
    fish = '🐠',
    bird = '🐦',
    reptile = '🦎',
    horse = '🐴',
}


type Key = keyof typeof EmojiPet


const StepListPets = ({
    nextStep,
    pets,
    handleNavigate,
}: StepProps) => {

    const { values } = useFormikContext<InitialValues>()

    return (
        <div className="mt-3 gap-2">
            <div className="overflow-auto h-[calc(100vh-24rem)] flex justify-center items-center">
                {
                    pets?.length === 0 && (
                        <div className="flex justify-center items-center  ">
                            <span className="text-gray-500 text-center font-semibold text-base">Nenhum pet encontrado</span>
                        </div>
                    )
                }
                {
                    pets?.map(pet => (
                        <button
                            key={pet.id}
                            type="button"
                            onClick={handleNavigate.bind(null, pet)}
                            className={option()}
                        >
                            <div className="grid grid-cols-4 justify-center items-center">
                                <span className="align-middle col-span-1">{
                                    EmojiPet[MapOptionSpecies[pet.pet_data.specie as KeyOfMapOptionSpecies] as Key]}</span>
                                <span className="align-middle col-span-2">{pet.pet_data.name_pet}</span>
                                <span className="align-middle col-span-1">{
                                    Species[MapOptionSpecies[pet.pet_data.specie as KeyOfMapOptionSpecies] as Key]
                                }</span>
                            </div>
                        </button>
                    ))
                }
            </div>

            <FieldControl
                name="name"
                label='Caso o pet não esteja na lista, digite o nome dele para prosseguir:'
                className=" w-full mb-4"
                placeholder="Nome do Pet"
            />

            <BoxButtons
                isValid={values.name.length > 0}
                link={false}
                cancel={(props) => <BtnLink {...props as any} message='Cadastro Completo' href="dashboard/pet" />}
                success={(props) => <BtnPrimary {...props} label='Cadastro Simplificado' />}
                onClickSuccess={nextStep}
            />
        </div>
    )
}

export default StepListPets