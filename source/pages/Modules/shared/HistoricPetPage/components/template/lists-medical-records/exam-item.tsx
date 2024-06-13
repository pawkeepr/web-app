import { format } from 'date-fns'
import { useTranslations } from '~/hooks/use-translations'
import type { ExamTest } from '~/types/medical-records'
import { itemStyle } from './styles'

type ExamItemProps = {
    item: ExamTest
}

const ExamItem = ({ item }: ExamItemProps) => {
    const date = format(new Date(item.date_exam), 'dd/MM/yyyy')
    const date_log = format(new Date(item.date_register_log), 'dd/MM/yyyy')
    const { t } = useTranslations('common')

    return (
        <li className={itemStyle.container()}>
            <p>
                <strong className="mr-2">Exame:</strong>
                <span>{item.name || 0}</span>
            </p>
            <p>
                <strong className="mr-2">Status:</strong>
                <span>{t(item.status_exam || 'not_applicable')}</span>
            </p>
            <p className="text-gray-500 ">
                <strong className="mr-2">Realizado em:</strong>
                <span>{date || t('not_applicable')}</span>
            </p>

            <p className="text-gray-500 ">
                <strong className="mr-2">Registro:</strong>
                <span>{date_log}</span>
            </p>
        </li>
    )
}

export default ExamItem
