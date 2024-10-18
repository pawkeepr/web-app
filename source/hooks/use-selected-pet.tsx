import { createContext, useContext, useState } from 'react'
import {
    useListPetsFromTutor,
    type Pet,
} from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import { usePetByIdV2 } from '~/store/hooks/pet-by-id'
import useProfile from '~/store/hooks/profile/use-profile'
import type { IPetV2 } from '~/types/pet-v2'

interface PetState {
    selected: Pet | null
    pets: Pet[] | undefined
    listPetsPending: boolean
    listPetsIsFetching: boolean
    pet: IPetV2 | null
    petPending: boolean
    petError: string | null | globalThis.Error
    onChangeSelectedPet: (pet: Pet) => void
}

const SelectPetContext = createContext<PetState | null>(null)

type SelectPetProviderProps = {
    children: React.ReactNode | ((state: PetState) => React.ReactNode | JSX.Element)
}

const SelectPetProvider = ({
    children,
}: SelectPetProviderProps): React.ReactElement => {
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

    const petState: PetState = {
        selected,
        pets,
        listPetsPending,
        listPetsIsFetching,
        pet: pet as IPetV2,
        petPending,
        petError,
        onChangeSelectedPet,
    }

    return (
        <SelectPetContext.Provider value={petState}>
            {typeof children === 'function' ? children(petState) : children}
        </SelectPetContext.Provider>
    )
}

export default SelectPetProvider

export const useSelectedPet = () => {
    const context = useContext(SelectPetContext)

    if (!context) {
        throw new Error('useSelectedPet must be used within a SelectPetProvider')
    }

    return context
}
