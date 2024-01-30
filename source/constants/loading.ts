export const LOADING = {
    IDLE: 1,
    PENDING: 2,
    SUCCESS: 3,
    FAILED: 4,
} as const
export type LOADING = (typeof LOADING)[keyof typeof LOADING]

export default LOADING
