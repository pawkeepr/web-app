import CardScheduled from '~/Components/organism/card-scheduled/card-scheduled'
import useGetAllAppointments from './hook'

const StepAll = () => {
    const { confirmedData, data, isLoading } = useGetAllAppointments()

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="w-full">
            <section className="w-full space-y-10">
                <h1 className="text-2xl font-bold">Confirmadas</h1>
                {confirmedData?.map((appointment) => (
                    <CardScheduled key={appointment.id} appointment={appointment} />
                ))}
                {confirmedData?.length === 0 && (
                    <div className="text-center">
                        <span>Não há agendamentos confirmados</span>
                    </div>
                )}
            </section>

            <section className="w-full mt-4 space-y-10">
                <h1 className="text-2xl font-bold">Agendadas</h1>
                {data?.map((appointment) => (
                    <CardScheduled key={appointment.id} appointment={appointment} />
                ))}
                {data?.length === 0 && (
                    <div className="text-center">
                        <span>Não há consultas agendadas</span>
                    </div>
                )}
            </section>
        </div>
    )
}

export default StepAll
