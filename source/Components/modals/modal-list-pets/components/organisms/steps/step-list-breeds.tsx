import { useFormikContext } from 'formik'
import { startTransition, useEffect, useMemo, useState } from 'react'
import BoxButtons from '~/Components/molecules/box-buttons/box-buttons'
import LOADING from '~/constants/loading'
import { useAppSelector } from '~/store/hooks'
import { species } from '~/store/pets/speciesType'
import { Breed } from '~/store/pets/types'
import { InitialValues } from '../../../modal-list-pets'

type Item = {
    name: Breed;
    value: Breed;
}

type StepListBreedsProps = {
    selectedTab: number
    onChangeSelectedTab: (index: number) => void
}

const StepListBreeds = ({
    onChangeSelectedTab,
    selectedTab
}: StepListBreedsProps) => {

    const [breeds, setBreeds] = useState<Item[]>([])
    const { values, setFieldValue } = useFormikContext<InitialValues>()


    const { isLoading } = useAppSelector(state => state.Pets)
    const { handleSubmit } = useFormikContext<InitialValues>()
    const pending = useMemo(() => isLoading === LOADING.PENDING, [isLoading])

    const prevStep = () => {
        onChangeSelectedTab(selectedTab - 1)
    }

    const handleSelectBreed = (breed: Breed) => {
        setFieldValue('breed', breed)
        handleSubmit()
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
                isValid={!values.breed}
                link={false}
                isLoading={pending}
                labelCancel='Voltar'
                visibleSuccess={false}
                onClickCancel={prevStep}
                onClickSuccess={() => { }}
            />
        </div>
    )
}

export default StepListBreeds