import { useFormikContext } from 'formik'
import { startTransition, useEffect, useState } from 'react'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import { species } from '~/store/slices/pets/speciesType'
import { Breed } from '~/store/slices/pets/types'
import { InitialValues, StepProps } from '../../types'

type Item = {
    name: Breed;
    value: Breed;
}

const StepListBreeds = ({
    nextStep,
    previousStep
}: StepProps) => {

    const [breeds, setBreeds] = useState<Item[]>([])
    const { values, setFieldValue } = useFormikContext<InitialValues>()


    const handleSelectBreed = (breed: Breed) => {
        setFieldValue('breed', breed)
        nextStep()
    }

    useEffect(() => {
        const specie = species.find(specie => (specie.value as any) === values.species)

        if (!specie) return

        startTransition(() => {
            setBreeds(specie.breedType)
        })

    }, [values.species])

    return (
        <div className="mt-3 p-1 gap-2">
            <div className="pb-1 max-h-[250px] overflow-auto">
                {
                    breeds.map(breed => (
                        <button
                            key={breed.value}
                            type="button"
                            onClick={() => handleSelectBreed(breed.value)}
                            className="
                            group w-full flex items-center justify-center 
                            rounded-md px-2 py-2 text-sm gap-2 
                            hover:bg-primary-500 dark:hover:!bg-primary-600 hover:text-white
                        "
                        >
                            <div className="grid grid-cols-4 justify-center items-center">
                                <span className="align-middle col-span-full">{breed.name}</span>
                            </div>
                        </button>
                    ))}
            </div>
            <BoxButtons
                isValid={!!values.species}
                link={false}
                onClickCancel={previousStep}
                onClickSuccess={nextStep}
            />
        </div>
    )
}

export default StepListBreeds