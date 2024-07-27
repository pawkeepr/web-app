import { useCallback, useId } from 'react'
import { create } from 'zustand'

export type ModalState = {
    open: {
        [key: string]: boolean | undefined
    }
    closeModal: (key: string) => void
    showModal: (key: string) => void
}

const useZustandModal = create<ModalState>((set) => ({
    open: {},
    closeModal: (key) =>
        set((state) => ({ open: { ...state.open, [key]: false } })),
    showModal: (key) => set((state) => ({ open: { ...state.open, [key]: true } })),
}))

const NameKeys = {
    confirm: 'confirm',
    delete: 'delete',
    edit: 'edit',
    add: 'add',
    info: 'info',
    success: 'success',
    error: 'error',
    warning: 'warning',
    alert: 'alert',
    custom: 'custom',
    drawer: 'drawer',
    search: 'search',
} as const
type NameKeys = (typeof NameKeys)[keyof typeof NameKeys]

type UseModalProps = {
    name?: NameKeys
    forceCloseDrawer?: boolean
}

const useModal = (props?: UseModalProps) => {
    const { name } = props || {}
    const id = name || useId()
    const { open, closeModal, showModal: showModalZustand } = useZustandModal()

    const showModal = useCallback(() => {
        showModalZustand(id)
    }, [id])

    return {
        open: open[id] || false,
        closeModal: () => closeModal(id),
        showModal: () => showModal(),
    }
}

export type IHookModal = ReturnType<typeof useModal>

export default useModal
