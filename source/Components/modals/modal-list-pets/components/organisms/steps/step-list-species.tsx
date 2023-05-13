import { useFormikContext } from 'formik'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import { Species, species } from '~/store/pets/speciesType'
import { InitialValues } from '../../../modal-list-pets'

enum EmojiPet {
    Gato = '🐱',
    Cachorro = '🐶',
    Coelho = '🐰',
    Peixe = '🐠',
    Pássaro = '🐦',
    Réptil = '🦎',
    Cavalo = '🐴',
}

type StepListSpeciesProps = {
    selectedTab: number
    onChangeSelectedTab: (index: number) => void
}

const StepListSpecies = ({
    onChangeSelectedTab,
    selectedTab }: StepListSpeciesProps) => {

    const { setFieldValue, values } = useFormikContext<InitialValues>()

    const nextStep = () => {
        onChangeSelectedTab(selectedTab + 1)
    }

    const prevStep = () => {
        onChangeSelectedTab(selectedTab - 1)
    }

    const handleSelectBreed = (specie: Species) => {
        setFieldValue('species', specie)
        nextStep()
    }

    return (
        <div className="mt-3 p-1 gap-2">
            <div className="pb-1">
                {
                    species.map(specie => (
                        <button
                            key={specie.value}
                            type="button"
                            onClick={() => handleSelectBreed(specie.value as any)}
                            className="
                            group w-full items-center justify-center 
                            rounded-md px-2 py-2 text-sm gap-2 
                            hover:bg-primary-500 dark:hover:!bg-primary-600 hover:text-white
                        "
                        >
                            <div className="grid grid-cols-4 justify-center items-center">
                                <span className="align-middle col-span-1">{EmojiPet[specie.name]}</span>
                                <span className="align-middle col-span-2">{specie.name}</span>
                            </div>
                        </button>
                    ))}
            </div>
            <BoxButtons
                isValid={!!values.species}
                link={false}
                visibleSuccess={false}
                labelCancel='Voltar'
                onClickCancel={prevStep}
                onClickSuccess={nextStep}
            />
        </div>
    )
}

export default StepListSpecies