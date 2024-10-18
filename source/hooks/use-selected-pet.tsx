import { create } from 'zustand'
import {
    useListPetsFromTutor,
    type Pet,
} from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import { usePetByIdV2 } from '~/store/hooks/pet-by-id'
import useProfile from '~/store/hooks/profile/use-profile'

interface PetState {
    selected: Pet | null
    onChangeSelectedPet: (pet: Pet) => void
}

const useSelectedPetState = create<PetState>()((set) => ({
    selected: null,
    onChangeSelectedPet: (pet: Pet) => set({ selected: pet }),
}))

const useSelectedPet = () => {
    const { selected, onChangeSelectedPet } = useSelectedPetState()
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

    return {
        selected,
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
