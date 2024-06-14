import { create } from 'zustand'
import { ModeProfile } from '~/types/profile'

export type ModeProfileState = {
    mode: ModeProfile
    onChangeModeProfile: (mode: ModeProfile) => void
}

const useModeProfile = create<ModeProfileState>((set) => ({
    mode: ModeProfile.tutor,
    onChangeModeProfile: (mode) => set({ mode }),
}))

export type IHookModeProfile = ReturnType<typeof useModeProfile>

export default useModeProfile
