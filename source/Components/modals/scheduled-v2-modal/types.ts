import type { IPet } from '~/types/pet'
import type { IPetV2 } from '~/types/pet-v2'

export type OnChangeOpen = (arg: boolean) => void

export type ChildrenProps = {
    onChangeOpen: OnChangeOpen
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
    onChangeStep: (step: number) => void
    isLoading?: boolean
    onChangePet: (pet: IPetV2) => void
    pet: IPetV2
}
