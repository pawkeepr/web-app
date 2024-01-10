import { differenceInYears } from 'date-fns'

// calcular idade
export const calcAge = (date?: Date | string | null): number => {
    if (!date) return 0

    const today = new Date()
    const birthDate = new Date(date)

    return differenceInYears(today, birthDate)
}
