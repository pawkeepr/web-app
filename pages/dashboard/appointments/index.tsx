import { useRouter, useSearchParams } from 'next/navigation'
import LayoutMain from '~/Layouts'
import AppointmentsPage from '~/pages/AppointmentsPage/Appointments'

const AppointmentsNext = () => {
    const search = useSearchParams()
    const document = search.get('document') || ''
    const pet = search.get('pet') || ''
    const appointment_id = search.get('appointment_id') || ''

    const { push } = useRouter()

    if (!document || !pet) return push('/dashboard')

    return (
        <LayoutMain>
            <AppointmentsPage
                document={document}
                pet={pet}
                appointment_id={appointment_id}
            />
        </LayoutMain>
    )
}

export default AppointmentsNext
