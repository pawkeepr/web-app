import { useFormikContext } from 'formik'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import { species, type Species } from '~/types/speciesType'
import type { InitialValues, StepProps } from '../../types'
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

const StepListSpecies = ({ nextStep, previousStep }: StepProps) => {
    const { setFieldValue, values } = useFormikContext<InitialValues>()

    const handleSelectedSpecie = (specie: Species) => {
        setFieldValue('specie', specie)
        nextStep()
    }

    return (
        <div className="flex-1 flex mobile:h-[90vh] h-[75vh] w-full  justify-between items-center flex-col">
            <div className="overflow-auto flex flex-1 gap-2 justify-start items-center flex-col w-full py-1">
                {species.map((specie) => (
                    <button
                        key={specie.value}
                        type="button"
                        onClick={() =>
                            handleSelectedSpecie(specie.value as Species)
                        }
                        className={option({
                            selected: values.specie === specie.value,
                        })}
                    >
                        <div className="flex justify-center gap-2 items-center w-full">
                            <span className="align-middle col-span-1">
                                {EmojiPet[specie.value as Key]}
                            </span>
                            <span className="align-middle col-span-2">
                                {specie.label}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
            <BoxButtons
                isValid={!!values.specie}
                link={false}
                onClickCancel={previousStep}
                onClickSuccess={nextStep}
            />
        </div>
    )
}

export default StepListSpecies
