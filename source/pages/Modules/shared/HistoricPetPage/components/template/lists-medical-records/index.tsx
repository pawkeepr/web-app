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
        <article className="gap-2 p-2 font-sans text-xs bg-white">
            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">
                    Evolução Corporal
                </h2>
                {body_evolution?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white"
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
            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">
                    Procedimentos Dentários
                </h2>
                {list_dental_procedures?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
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
            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">
                    Exames e Testes
                </h2>
                {exams?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Exame:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>
            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">
                    Atividade Física
                </h2>
                {physical_activities?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Atividade:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">
                    Hospitalizações
                </h2>
                {hospitalizations?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Atividade:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">Doenças</h2>
                {diseases?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Doença:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">Alergias</h2>
                {allergies?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Alergia:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">Internações</h2>
                {internment?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Internação:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">Cirurgias</h2>
                {surgeries?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Cirurgia:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">Lesões</h2>
                {injuries?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Lesão:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">Medicamentos</h2>
                {medicines?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Medicamento:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">Vacinas</h2>
                {vaccines?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
                    >
                        <p className="text-gray-500">
                            <strong>Vacina:</strong>
                            <span>{item.name}</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="my-2">
                <h2 className="text-base font-bold text-gray-500">Nutrição</h2>
                {nutritions?.map((item) => (
                    <div
                        key={item.id as string}
                        className="flex flex-row items-center justify-between h-10 bg-white card card-bordered card-compact"
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
