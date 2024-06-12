import { format } from 'date-fns'
import { useTranslations } from '~/hooks/use-translations'
import type { Hospitalization } from '~/types/medical-records'
import { itemStyle } from './styles'

type HospitalizationItemProps = {
    item: Hospitalization
}

const HospitalizationsItem = ({ item }: HospitalizationItemProps) => {
    const date_log = format(new Date(item.date_register_log), 'dd/MM/yyyy')
    const { t } = useTranslations('common')

    return (
        <li className={itemStyle.container()}>
            <p>
                <strong className="mr-2">Hospital:</strong>
                <span>{item.name || 0}</span>
            </p>

            <p className="text-gray-500 ">
                <strong className="mr-2">Registro:</strong>
                <span>{date_log}</span>
            </p>
        </li>
    )
}

export default HospitalizationsItem
