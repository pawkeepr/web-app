import AddMedicalRecordsModal from '~/Components/modals/add-medical-records/add-medical-records'
import VisualizationMode from '~/Components/organism/visualization-mode'
import { useGetMedicalRecordsByPet } from '~/store/hooks/medical-records'
import ListsMedicalRecords from './lists-medical-records'

type HistoricPetProps = {
    document?: string
    id_pet?: string
}

const MedicalRecords = ({ id_pet, document }: HistoricPetProps) => {
    const { data, isLoading, error } = useGetMedicalRecordsByPet({
        id_pet: id_pet as string,
        cpf_cnpj: document as string,
    })

    if (error) return <div>Erro ao carregar prontuário</div>

    return (
        <section className="relative gap-2">
            <div className="web:flex web:flex-1 web:justify-end">
                <AddMedicalRecordsModal
                    item={null}
                    cpf_cnpj={document as string}
                    id_pet={id_pet as string}
                />
            </div>

            <VisualizationMode />
            <ListsMedicalRecords condition={!isLoading} data={data} />
        </section>
    )
}

export default MedicalRecords
