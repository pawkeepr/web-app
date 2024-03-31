import withControl from '~/Components/helpers/with-control'
import type { PetMedicalRecords } from '~/types/medical-records'

type ListMedicalRecordsProps = {
    data?: PetMedicalRecords
}

const ListMedicalRecords = ({ data }: ListMedicalRecordsProps) => {
    const body_evolution = data?.list_well_being?.body_evolution
    const list_dental_procedures = data?.list_dental_procedures
    const exams = data?.list_exams_tests
    const physical_activities = data?.list_well_being?.physical_activities
    const hospitalizations = data?.list_hospital_information?.list_hospitalizations
    const surgeries = data?.list_hospital_information?.list_surgeries
    const diseases = data?.list_hospital_information?.list_diseases
    const injuries = data?.list_hospital_information?.list_injuries
    const internment = data?.list_hospital_information?.list_internment
    const allergies = data?.list_hospital_information?.list_allergies
    const medicines = data?.list_medicines
    const vaccines = data?.list_vaccines
    const nutritions = data?.list_nutritions

    return (
        <article>
            <section>
                <h2 className="card-title">Evolução Corporal</h2>
                {body_evolution?.map((item) => (
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
            <section>
                <h2 className="card-title">Procedimentos Dentários</h2>
                {list_dental_procedures?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Procedimento:</strong>
                            <span>{item.name}</span>
                        </p>
                        {/* <p className="text-gray-500 ">
                        <strong>Data:</strong>
                        <span>
                            {format(item.date_application, 'dd/MM/yyyy') ||
                                'Não Definida'}
                        </span>
                    </p> */}
                    </div>
                ))}
            </section>
            <section>
                <h2 className="card-title">Exames e Testes</h2>
                {exams?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Exame:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>
            <section>
                <h2 className="card-title">Atividade Física</h2>
                {physical_activities?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Atividade:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="card-title">Hospitalizações</h2>
                {hospitalizations?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Atividade:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="card-title">Doenças</h2>
                {diseases?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Doença:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="card-title">Alergias</h2>
                {allergies?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Alergia:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="card-title">Internações</h2>
                {internment?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Internação:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="card-title">Cirurgias</h2>
                {surgeries?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Cirurgia:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="card-title">Lesões</h2>
                {injuries?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Lesão:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="card-title">Medicamentos</h2>
                {medicines?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Medicamento:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="card-title">Vacinas</h2>
                {vaccines?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Vacina:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="card-title">Nutrição</h2>
                {nutritions?.map((item) => (
                    <div
                        key={item.id as string}
                        className="bg-white flex h-10 card card-bordered card-compact flex-row justify-between items-center"
                    >
                        <p className="text-gray-500">
                            <strong>Nutrição:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>
        </article>
    )
}

export default withControl(ListMedicalRecords)
