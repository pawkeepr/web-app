import CardScheduled from '~/Components/organism/card-scheduled/card-scheduled'
import useGetAllAppointments from './hook'

const StepAll = () => {
    const { confirmedData, data, isLoading } = useGetAllAppointments()
    if (isLoading) return <div>Loading...</div>

    return (
        <div className="w-full h-screen bg-base-100 gap-10">
            <section className="w-full  px-4 mobile:!px-2  ">
                <h1 className="text-lg font-bold">Confirmadas</h1>
                {confirmedData?.map((appointment) => (
                    <CardScheduled key={appointment.id} appointment={appointment} />
                ))}
                {confirmedData?.length === 0 && (
                    <div className="text-center">
                        <span>Não há agendamentos confirmados</span>
                    </div>
                )}
            </section>

            <section className="w-full  px-4 mobile:!px-2 ">
                <h1 className="text-lg font-bold">Agendadas</h1>
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
