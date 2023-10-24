import { Gender, Species } from '~/store/slices/pets/speciesType'
import { Breed } from '~/store/slices/pets/types'
import { IPetV2 } from '~/types/pet-v2'

export type onChangeOpen = (arg: boolean) => void

export type ChildrenProps = {
    onChangeOpen: onChangeOpen
    onChangeDocument: (doc: string) => void
}

export type ModalConfirmProps = {
    label?: string
    children?: (params: ChildrenProps) => React.ReactNode
    selectedTabInitial?: number
}

export type InitialValues = {
    id?: string | null
    name: string
    species: Species
    breed: Breed
    gender: Gender
    document: string
    ownerEmergencyContact: {
        email: string
        cpf_cnpj: string
        phone: string
    }
}

export type StepProps = {
    nextStep: () => void
    previousStep: () => void
    pets: IPetV2[]
    handleNavigate: (pet: IPetV2) => void
}