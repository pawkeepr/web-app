import { differenceInYears } from 'date-fns'

// calcular idade
export const calcAge = (date?: Date | string | null): number => {
    try {
        if (!date) return 0

        const today = new Date()
        const birthDate = new Date(date)

        return differenceInYears(today, birthDate)
    } catch (error) {
        console.error('Error calcAge', error)
        return 0
    }
}
