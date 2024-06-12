import { format } from 'date-fns'
import { tv } from 'tailwind-variants'
import { useTranslations } from '~/hooks/use-translations'
import type { DentalProcedure as IDentalProcedure } from '~/types/medical-records'
import { itemStyle } from './styles'

type ItemProps = {
    item: IDentalProcedure
}

const status_dental = tv({
    base: '',
    variants: {
        status: {
            good: 'text-primary-500',
            regular: 'text-secondary-500',
            bad: 'text-red-500',
        },
    },
})

const DentalProcedure = ({ item }: ItemProps) => {
    const date = format(new Date(item.date_register_log), 'dd/MM/yyyy')
    const { t } = useTranslations('common')

    return (
        <li className={itemStyle.container()}>
            <p>
                <strong className="mr-2">Saúde:</strong>
                <span className={status_dental({ status: item.status_dental })}>
                    {t(`the_${item.status_dental}`)}
                </span>
            </p>
            <p>
                <strong className="mr-2">Rec.:</strong>
                <span>{item.recommended_treatment || t('not_applicable')}</span>
            </p>
            <p>
                <strong className="mr-2">Prox. Consulta:</strong>
                <span>{item.follow_up_required || t('not_applicable')}</span>
            </p>
            <p>
                <strong className="mr-2">Procedimento:</strong>
                <span>{item.name || t('not_applicable')}</span>
            </p>
            <p className="text-gray-500 ">
                <strong className="mr-2">Registro:</strong>
                <span>{date || t('not_applicable')}</span>
            </p>
        </li>
    )
}

export default DentalProcedure
