import { useEffect } from 'react'

export const KeyboardKey = {
    ArrowRight: 39,
    ArrowLeft: 37,
    Enter: 13,
    Space: 32,
    Escape: 27,
    Tab: 9,
    Shift: 16,
    Control: 17,
    Alt: 18,
    CapsLock: 20,
    NumLock: 144,
    ScrollLock: 145,
    Backspace: 8,
    Delete: 46,
    Insert: 45,
    Home: 36,
    End: 35,
    PageUp: 33,
    PageDown: 34,
    ArrowUp: 38,
    ArrowDown: 40,
    PrintScreen: 44,
    Pause: 19,
    Meta: 91,
} as const
export type KeyboardKey = keyof typeof KeyboardKey
export type KeyboardEventCode = (typeof KeyboardKey)[keyof typeof KeyboardKey]

type KeyboardNavigation = Partial<Record<KeyboardKey, (...args: unknown[]) => void>>

const useKeyboardNavigation = (props: KeyboardNavigation) => {
    useEffect(() => {
        const activeElement = document.activeElement
        const isInput =
            activeElement &&
            (activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.tagName === 'SELECT')

        if (isInput) {
            return
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event
            const callback = props[key as KeyboardKey]
            if (callback) {
                event.preventDefault()
                callback()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })
}

export default useKeyboardNavigation
