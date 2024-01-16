import { useMemo } from 'react'
import { useSearch } from '~/Components/molecules/search-input/search-input'
import useListAppointments from '~/store/hooks/list-appointments'
import type { VeterinaryConsultation } from '~/types/appointment'

const filter = (search: string, data?: VeterinaryConsultation[]) => {
    if (!data) return []

    const filteredData = data.filter((item) => {
        const { pet, veterinary, tutor } = item.tutor_pet_vet

        const petName = pet?.name_pet || ''
        const specieName = (pet?.specie as string) || ''
        const breedName = (pet?.race as string) || ''
        const phone = tutor?.contact?.phone || ''
        const whatsApp = tutor?.contact?.whatsapp || ''
        const veterinaryName = veterinary?.name || ''
        const tutorName = tutor?.name || ''
        const cpf_tutor = tutor?.cpf_cnpj || ''
        const email_tutor = tutor?.contact?.email || ''

        const searchLowerCase = search.toLowerCase()

        return (
            petName.toLowerCase().includes(searchLowerCase) ||
            veterinaryName.toLowerCase().includes(searchLowerCase) ||
            tutorName.toLowerCase().includes(searchLowerCase) ||
            cpf_tutor.toLowerCase().includes(searchLowerCase) ||
            email_tutor.toLowerCase().includes(searchLowerCase) ||
            specieName.toLowerCase().includes(searchLowerCase) ||
            breedName.toLowerCase().includes(searchLowerCase) ||
            phone.toLowerCase().includes(searchLowerCase) ||
            whatsApp.toLowerCase().includes(searchLowerCase)
        )
    })

    return filteredData
}

const useGetAllAppointments = () => {
    const { activeData: scheduledData, isLoading: isLoadingScheduled } =
        useListAppointments({ mode: 'scheduled' })
    const { activeData, isLoading: isLoadingConfirmed } = useListAppointments({
        mode: 'confirmed',
    })
    const { activeData: rescheduledData, isLoading: isLoadingRescheduled } =
        useListAppointments({ mode: 'rescheduled' })

    const { search } = useSearch()

    const [data, confirmedData] = useMemo(() => {
        const allData = [
            ...(scheduledData as VeterinaryConsultation[]),
            ...(rescheduledData as VeterinaryConsultation[]),
        ]

        if (!search) return [allData, activeData]

        const filteredDataAllData = filter(search, allData)
        const filteredDataConfirmed = filter(search, activeData)

        return [filteredDataAllData, filteredDataConfirmed]
    }, [scheduledData, rescheduledData, activeData, search])

    const isLoading = useMemo(() => {
        return isLoadingScheduled || isLoadingConfirmed || isLoadingRescheduled
    }, [isLoadingScheduled, isLoadingConfirmed, isLoadingRescheduled])

    return { data, isLoading, confirmedData }
}

export default useGetAllAppointments
