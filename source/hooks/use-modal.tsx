import { useCallback, useState } from 'react'

export type IHookModal = {
    open: boolean
    closeModal: () => void
    showModal: () => void
}

const useModal = (): IHookModal => {
    const [open, setOpen] = useState(false)

    const closeModal = useCallback(() => {
        setOpen(false)
    }, [])

    const showModal = useCallback(() => {
        setOpen(true)
    }, [])

    return {
        open,
        closeModal,
        showModal,
    }
}

export default useModal
