import { useGetMedicalRecordsByPet } from '~/store/hooks/medical-records'
import ListsMedicalRecords from './lists-medical-records'

type HistoricPetProps = {
    document: string
    id_pet: string
}

const MedicalRecords = ({ id_pet, document }: HistoricPetProps) => {
    const { data, isLoading, error } = useGetMedicalRecordsByPet({
        id_pet: id_pet as string,
        cpf_cnpj: document as string,
    })

    if (error) return <div>Erro ao carregar prontuário</div>

    return (
        <section className="relative gap-2 mt-2">
            <ListsMedicalRecords
                condition={!isLoading}
                data={data}
                document={document}
                id_pet={id_pet}
            />
        </section>
    )
}

export default MedicalRecords
