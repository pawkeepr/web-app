import { useState } from 'react'
import {
    useListPetsFromTutor,
    type Pet,
} from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import { usePetByIdV2 } from '~/store/hooks/pet-by-id'
import useProfile from '~/store/hooks/profile/use-profile'

const useSelectedPet = () => {
    const [selected, setSelected] = useState<Pet | null>(null)
    const {
        data: pets,
        isPending: listPetsPending,
        isFetching: listPetsIsFetching,
    } = useListPetsFromTutor()
    const { data: profile } = useProfile()

    const {
        data: pet,
        isPending: petPending,
        error: petError,
    } = usePetByIdV2(
        profile?.user_information?.cpf_cnpj as string,
        selected?.id_pet as string,
    )

    const onChangeSelectedPet = (pet: Pet) => {
        setSelected(pet)
    }

    return {
        selected,
        setSelected,
        pets,
        listPetsPending,
        listPetsIsFetching,
        pet,
        petPending,
        petError,
        onChangeSelectedPet,
    }
}

export default useSelectedPet
