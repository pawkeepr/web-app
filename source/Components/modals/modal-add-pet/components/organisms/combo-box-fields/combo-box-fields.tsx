import { useFormikContext } from "formik"
import { useEffect, useState, useTransition } from "react"
import ListBoxTailwind from "~/Components/molecules/list-box-tailwind/list-box-tailwind"
import { BloodType } from "~/store/pets/bloodType"
import { Breed } from "~/store/pets/breedType"
import { SpeciesType, species } from '~/store/pets/speciesType'

type AuxSpeciesFormikProps = {
    species: SpeciesType
    breed: string
    bloodType: string
    pet: {
        id?: string
        species: SpeciesType
        breed: Breed
        bloodType: BloodType
    }
}

type ComboBoxFieldsProps = {
    name?: string
}

const ComboBoxFields = ({ name }: ComboBoxFieldsProps) => {

    const [specie, setSpecie] = useState<SpeciesType>({} as SpeciesType)
    const [reset, setReset] = useState(false)

    const { setFieldValue, values } = useFormikContext<AuxSpeciesFormikProps>()

    const [isPending, startTransition] = useTransition()

    const pet = values['pet']

    useEffect(() => {
        if (!pet?.id) {
            return
        }

        const specie = species.find(specie => (specie.name as any) === pet.species)

        if (!specie) {
            return
        }

        startTransition(() => {
            setSpecie(specie)
            setFieldValue('breed', pet.breed)
            setFieldValue('bloodType', pet.bloodType)
        })

    }, [pet, setFieldValue])

    const onChangeSpecie = (specie: SpeciesType) => {
        startTransition(() => {
            setSpecie(specie)
            setFieldValue('breed', '')
            setFieldValue('bloodType', '')
            setReset(!reset)
        })
    }

    const memoNameSpecies = !name ? 'species' : `${name}.species`
    const memoNameBreed = !name ? 'breed' : `${name}.breed`
    const memoNameBloodType = !name ? 'bloodType' : `${name}.bloodType`


    return (
        <>
            <div className="w-full lg:w-1/3 px-3 mb-6">
                <ListBoxTailwind
                    items={species}
                    option={specie}
                    required
                    disabled={isPending || !!values.pet?.id}
                    onChangeOption={onChangeSpecie}
                    name={memoNameSpecies}
                    placeholder="Ex: Cachorro, Gato, etc..."
                    label="Espécie"
                />
            </div>

            <div className="w-full lg:w-1/3 px-3 mb-6">
                {
                    isPending && (<div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>)
                }
                {!isPending && (
                    <ListBoxTailwind
                        items={specie.breedType}
                        reset={specie}
                        option={{ name: values.breed, value: values.breed }}
                        disabled={!specie.breedType || !!values.pet?.id}
                        required
                        name={memoNameBreed}
                        label="Raça"
                        placeholder="Ex: Vira-lata, Poodle, etc..."
                    />)
                }
            </div>

            <div className="w-full lg:w-1/3 px-3 mb-6">
                {
                    isPending && (<div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>)
                }
                {!isPending && (
                    <ListBoxTailwind
                        reset={specie}
                        items={specie.bloodType}
                        option={{ name: values.bloodType, value: values.bloodType }}
                        disabled={!specie.bloodType || isPending || !!values.pet?.id}
                        name={memoNameBloodType}
                        label="Tipo Sanguíneo"
                        placeholder="Ex: A, B, etc..."
                    />
                )
                }
            </div>
        </>
    )
}

export default ComboBoxFields