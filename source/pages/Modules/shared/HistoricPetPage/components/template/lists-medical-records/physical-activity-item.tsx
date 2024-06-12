import { format } from 'date-fns'
import type { PhysicalActivity } from '~/types/medical-records'

type PhysicalActivityItemProps = {
    item: PhysicalActivity
}

const PhysicalActivityItem = ({ item }: PhysicalActivityItemProps) => {
    const date_log = format(new Date(item.date_register_log), 'dd/MM/yyyy')

    return (
        <li className="flex flex-row items-center justify-between h-10 ">
            <p>
                <strong className="mr-2">Exame:</strong>
                <span>{item.name || 0}</span>
            </p>

            <p className="text-gray-500 ">
                <strong className="mr-2">Registro:</strong>
                <span>{date_log}</span>
            </p>
        </li>
    )
}

export default PhysicalActivityItem
