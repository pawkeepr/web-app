import { useFormikContext } from 'formik'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import {
    EmojiPet,
    species,
    type KeysEmojiPet,
    type Species,
} from '~/types/speciesType'
import type { InitialValues, StepProps } from '../../types'
import { option } from '../helpers'

const StepListSpecies = ({ nextStep, previousStep }: StepProps) => {
    const { setFieldValue, values } = useFormikContext<InitialValues>()

    const handleSelectedSpecie = (specie: Species) => {
        setFieldValue('specie', specie)
        nextStep()
    }

    return (
        <div className="flex-1 flex mobile:h-[90vh] h-[75vh] w-full  justify-between items-center flex-col">
            <div className="flex flex-col items-center justify-start flex-1 w-full gap-2 py-1 overflow-auto">
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
                        <div className="flex items-center justify-center w-full gap-2">
                            <span className="col-span-1 align-middle">
                                {EmojiPet[specie.value as KeysEmojiPet]}
                            </span>
                            <span className="col-span-2 align-middle">
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
