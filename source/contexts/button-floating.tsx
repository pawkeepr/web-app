import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { create } from 'zustand'

interface ButtonFloatingContext {
    hasButtonFloating: boolean
    setHasButtonFloating: (hasButtonFloating: boolean) => void
}

export const useZustandBtnFloating = create<ButtonFloatingContext>((set) => ({
    hasButtonFloating: false,
    setHasButtonFloating: (hasButtonFloating) => set({ hasButtonFloating }),
}))

const list = ['/veterinary/dashboard/appointments', '/feedback']

export const useBtnFloating = () => {
    const pathname = usePathname()
    const { hasButtonFloating, setHasButtonFloating } = useZustandBtnFloating()

    useEffect(() => {
        const permission = list.some((item) => pathname.startsWith(item))
        if (permission) {
            setHasButtonFloating(false)
        } else {
            setHasButtonFloating(true)
        }
    }, [pathname])

    return {
        hasButtonFloating,
        setHasButtonFloating,
    }
}
