import { useRouter, useSearchParams } from "next/navigation"
import AppointmentsPage from "~/pages/AppointmentsPage/Appointments"

const AppointmentsNext = () => {
    const search = useSearchParams()
    const document = search.get('document') || ''
    const pet = search.get('pet') || ''
    const { push } = useRouter()

    if (!document || !pet) return push('/dashboard')


    return (
        <AppointmentsPage document={document} pet={pet} />
    )
}

export default AppointmentsNext