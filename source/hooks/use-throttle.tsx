import { useRef } from 'react'

function useThrottle<T extends (...args: any[]) => any>(func: T, delay: number): T {
    const timeoutRef = useRef<NodeJS.Timeout>()

    function throttledFunc(this: any, ...args: any[]) {
        if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = undefined
            }, delay)

            return func.apply(this, args)
        }
    }

    return throttledFunc as T
}

export default useThrottle
