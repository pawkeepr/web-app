import { useState } from 'react'

export default function useDebounce() {
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>()

    const debounce = async (func: () => any, wait: number = 1000) => {
        clearTimeout(typingTimeout!)

        const timeout = setTimeout(() => {
            func()
            // eslint-disable-next-line testing-library/await-async-utils
        }, wait)

        setTypingTimeout(timeout)
    }

    return debounce
}