import withControl from '~/Components/helpers/with-control'
import type { PetMedicalRecords } from '~/types/medical-records'

type ListMedicalRecordsProps = {
    data?: PetMedicalRecords
}

const ListMedicalRecords = ({ data }: ListMedicalRecordsProps) => {
    return (
        <article>
            <section>
                <h2 className="card-title">Evolução Corporal</h2>
                {data?.list_well_being?.body_evolution?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Idade:</strong>
                            <span>{item.age || 0}</span>
                        </p>
                        <p className="text-gray-500 ">
                            <strong>Peso:</strong>
                            <span>{item.weight || 0}</span>
                        </p>

                        <p className="text-gray-500 ">
                            <strong>Altura:</strong>
                            <span>{item.height || 0}</span>
                        </p>
                        <p className="text-gray-500 ">
                            <strong>Data:</strong>
                            <span>{item.date_application || 'Não Definido'}</span>
                        </p>
                    </div>
                ))}
            </section>
        </article>
    )
}

export default withControl(ListMedicalRecords)
