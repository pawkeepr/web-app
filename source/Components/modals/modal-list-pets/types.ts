import { IPet } from '~/types/pet'
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

export type InitialValues = IPet

export type StepProps = {
    nextStep: () => void
    previousStep: () => void
    onChangeDocument: (doc: string) => void
    closeModal?: () => void
    pets: IPetV2[]
    handleNavigate: (pet: IPetV2) => void
    onChangeStep: (step: number) => void
    isLoading?: boolean
}