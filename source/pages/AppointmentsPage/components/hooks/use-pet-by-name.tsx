import { useEffect, useTransition } from "react"
import { Data } from "~/store/pets/types"

type UsePetByNameProps = {
    name?: string | null,
    pets: Data[],
    onChangeField: (field: string, value: any) => void
}

const usePetByName = ({ onChangeField, pets, name }: UsePetByNameProps) => {
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        if (!name) {
            return
        }

        const pet = pets.find(pet => pet.name === name)

        if (pet) return

        onChangeField('pet.id', '')
        onChangeField('pet.avatar', '')
    }, [name, pets, onChangeField])

    const onChangePet = (pet: Data) => {
        startTransition(() => {
            onChangeField('pet.id', pet.id)
            onChangeField('pet.avatar', pet.avatar)
            onChangeField('pet.breed', pet.breed)
            onChangeField('pet.species', pet.species)
            onChangeField('pet.bloodType', pet.bloodType)
            onChangeField('pet.gender', pet.gender)
            onChangeField('pet.dateOfBirth', pet.dateOfBirth)
        })
    }


    return {
        isPending,
        onChangePet
    }
}

export default usePetByName