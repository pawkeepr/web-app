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

export const useBtnFloating = () => {
    const pathname = usePathname()
    const { hasButtonFloating, setHasButtonFloating } = useZustandBtnFloating()

    useEffect(() => {
        if (pathname === '/dashboard') {
            setHasButtonFloating(true)
        } else {
            setHasButtonFloating(false)
        }
    }, [pathname])

    return {
        hasButtonFloating,
        setHasButtonFloating,
    }
}
