import { create } from 'zustand'
import type { ModeInput } from '~/Components/molecules/field-control/field-control'

type State = {
    mode: ModeInput
    onChangeMode: (mode: ModeInput) => void
}

export const useModeEditablePet = create<State>((set) => ({
    mode: 'editable',
    onChangeMode: (mode) => set({ mode }),
}))
