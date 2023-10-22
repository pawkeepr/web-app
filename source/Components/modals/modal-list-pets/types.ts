import useFindTutorByDocument from '~/hooks/use-find-tutor-by-document'
import { SpeciesType } from '~/store/slices/pets/speciesType'
import { Breed } from '~/store/slices/pets/types'
import { IPet } from '~/types/pet'

export type onChangeOpen = (arg: boolean) => void

export type ChildrenProps = {
    onChangeOpen: onChangeOpen
    onChangeDocument: (doc: string) => void
}

export type ModalConfirmProps = {
    label?: string
    onCancel?: () => void
    children?: (params: ChildrenProps) => React.ReactNode
    selectedTabInitial?: number
}

export type InitialValues = {
    name: string
    species: SpeciesType
    breed: Breed
    document: string
    ownerEmergencyContact: ReturnType<typeof useFindTutorByDocument>
}

export type StepProps = {
    nextStep: () => void
    previousStep: () => void
    pets: IPet[]
    handleNavigate: (pet: IPet) => void
}