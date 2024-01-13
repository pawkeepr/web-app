import type { IPet } from '~/types/pet'
import type { IPetV2 } from '~/types/pet-v2'

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
export type CtxSimplifiedPeTFields = Pick<
    IPet,
    'race' | 'specie' | 'sex' | 'bloodType' | 'name' | 'ownerEmergencyContact'
>

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
