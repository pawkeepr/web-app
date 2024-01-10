import { useCallback, useState } from 'react'

const useModal = () => {
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
