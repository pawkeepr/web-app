import { format } from 'date-fns'
import { useTranslations } from '~/hooks/use-translations'
import type { Medicine } from '~/types/medical-records'
import { itemStyle } from './styles'

type ItemProps = {
    item: Medicine
}

const MedicationsItem = ({ item }: ItemProps) => {
    const date_log = format(new Date(item.date_register_log), 'dd/MM/yyyy')
    const { t } = useTranslations('common')

    return (
        <li className={itemStyle.container()}>
            <p>
                <strong className="mr-2">Medicamento: </strong>
                <span>{item.name}</span>
            </p>
            <p>
                <strong className="mr-2">Dosagem: </strong>
                <span>{item.dosage || 'N/A'}</span>
            </p>

            <p>
                <strong className="mr-2">Via de Administração: </strong>
                <span>{item.administration_route || 'N/A'}</span>
            </p>

            <p>
                <strong className="mr-2">Frequência: </strong>
                <span>{item.frequency || 'N/A'}</span>
            </p>

            <p>
                <strong className="mr-2">Período: </strong>
                <span>{item.period || 'N/A'}</span>
            </p>

            <p>
                <strong className="mr-2">Uso Contínuo: </strong>
                <span>{item.continuous_use === 'yes' ? 'Sim' : 'Não'}</span>
            </p>

            <p className="text-gray-500 ">
                <strong className="mr-2">Registro:</strong>
                <span>{date_log}</span>
            </p>
        </li>
    )
}

export default MedicationsItem
