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
    const { activeData: canceledData, isLoading: isLoadingCanceled } =
        useListAppointments({ mode: 'canceled' })
    const { activeData: doneData, isLoading: isLoadingDone } = useListAppointments({
        mode: 'done',
    })

    const { search } = useSearch('historic')

    const [filteredCanceledData, filteredDoneData] = useMemo(() => {
        if (!search) return [canceledData, doneData]

        const filteredCanceledData = filter(search, canceledData)
        const filteredDoneData = filter(search, doneData)

        return [filteredCanceledData, filteredDoneData]
    }, [doneData, canceledData, search])

    const isLoading = useMemo(() => {
        return isLoadingCanceled || isLoadingDone
    }, [isLoadingCanceled, isLoadingDone])

    return { filteredCanceledData, isLoading, filteredDoneData }
}

export default useGetAllAppointments
