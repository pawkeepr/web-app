const ModeInput = {
    editable: 'editable',
    readonly: 'readonly',
} as const

export default ModeInput
export type ModeInput = (typeof ModeInput)[keyof typeof ModeInput]
