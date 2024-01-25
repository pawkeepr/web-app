import { useMemo } from 'react'
import CardPet from '~/Components/organism/card-pets/card-pets'
import useListPetsByDocument from '~/store/hooks/list-pets-by-document/use-list-pets-by-document'
import type { IPetV2, IPetV2Data } from '~/types/pet-v2'

type HistoricPetProps = {
    document?: string
    id_pet?: string
}
const makePetV2Data = (data: IPetV2): IPetV2Data => {
    return {
        ...(data?.pet_information as Omit<IPetV2Data, 'cpf_cnpj'>),
        cpf_cnpj: data?.main_responsible_guardian?.cpf_cnpj,
        id_pet: data?.id as string,
    }
}

const HistoricPet = ({ document, id_pet }: HistoricPetProps) => {
    const { activeData, isLoading } = useListPetsByDocument({
        document: document as string,
        strategy: 'update',
        id_pet,
    })

    const pet = useMemo(() => activeData as IPetV2, [activeData])
    const cardData = useMemo(() => makePetV2Data(pet), [pet])

    if (isLoading) return <div>Carregando...</div>

    return (
        <section>
            <CardPet pet={cardData} />
        </section>
    )
}

export default HistoricPet
