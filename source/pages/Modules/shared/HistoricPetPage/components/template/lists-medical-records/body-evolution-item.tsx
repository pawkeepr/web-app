import { format } from 'date-fns'
import { FaWeight } from 'react-icons/fa'
import type { BodyEvolution } from '~/types/medical-records'
type BodyEvolutionItemProps = {
    item: BodyEvolution
}

const BodyEvolutionItem = ({ item }: BodyEvolutionItemProps) => {
    const date = format(new Date(item.date_register_log), 'dd/MM/yyyy')

    return (
        <li className="flex items-center w-full p-6 rounded-lg shadow-theme-3 bg-green-50">
            <div className="p-4 bg-green-100 rounded-full">
                <FaWeight className="text-4xl text-green-500" />
            </div>
            <div className="ml-4 text-start">
                <h2 className="text-lg font-bold text-gray-700">
                    Peso: {item.weight} {item.type_weight}
                </h2>
                <p className="text-gray-600">
                    Data de Registro:{' '}
                    {Intl.DateTimeFormat('pt-BR').format(
                        new Date(item.date_register_log),
                    )}
                </p>
                <p className="text-gray-600">Notas: {item.notes_consults}</p>
            </div>
        </li>
    )
}

export default BodyEvolutionItem
