import { useSearchParams } from "next/navigation"
import AppointmentsPage from "~/pages/AppointmentsPage/Appointments"

const AppointmentsNext = () => {
    const search = useSearchParams()
    const document = search.get('document') || ''
    const pet = search.get('pet') || ''
    return (
        <AppointmentsPage document={document} pet={pet} />
    )
}

export default AppointmentsNext