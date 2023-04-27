import { useSearchParams } from "next/navigation"
import AppointmentsPage from "~/pages/AppointmentsPage/Appointments"

const AppointmentsNext = () => {
    const search = useSearchParams()
    const document = search.get('document') || ''
    return (
        <AppointmentsPage document={document} />
    )
}

export default AppointmentsNext