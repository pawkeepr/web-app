/* eslint-disable testing-library/await-async-utils */
import { useEffect, useMemo, useState } from "react"
import useDebounce from "./use-debounce"
import useThrottle from "./use-throttle"

type NextStep = () => void

const useNextStep = (nextStep: NextStep, condition: boolean, wait: number = 100) => {
    const [step, setStep] = useState(true)

    const debounce = useDebounce()

    const requiredValid = useMemo((): boolean => {
        const isValid = condition

        if (isValid) {
            setStep(true)
        }

        return isValid
    }, [condition])

    const nextStepThrottle = useThrottle(nextStep, wait)

    useEffect(() => {
        if (requiredValid && step) {
            debounce(() => nextStepThrottle(), wait)
        }

        return () => {
            setStep(false)
        }
    }, [requiredValid, nextStepThrottle, step, debounce, wait])

    return requiredValid
}

export default useNextStep