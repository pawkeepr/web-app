import { format } from 'date-fns'
import type { BodyEvolution } from '~/types/medical-records'
type BodyEvolutionItemProps = {
    item: BodyEvolution
}

const BodyEvolutionItem = ({ item }: BodyEvolutionItemProps) => {
    const date = format(new Date(item.date_register_log), 'dd/MM/yyyy')

    return (
        <li className="flex flex-row items-center justify-between h-10 ">
            <p>
                <strong className="mr-2">Idade:</strong>
                <span>{item.age || 0}</span>
            </p>

            <p>
                <strong className="mr-2">Peso:</strong>
                <span>{item.weight || 0}</span>
                <span>{item.type_weight || 'kg'}</span>
            </p>

            <p className="text-gray-500 ">
                <strong className="mr-2">Registro:</strong>
                <span>{date || 'Não Definido'}</span>
            </p>
        </li>
    )
}

export default BodyEvolutionItem
