import CardScheduled from '~/Components/organism/card-scheduled/card-scheduled'
import useListAppointmentsByPet from '~/store/hooks/list-appointments-by-pet'

type HistoricPetProps = {
    document?: string
    id_pet?: string
}

const HistoricPet = ({ id_pet }: HistoricPetProps) => {
    const { activeData: appointments, isLoading } = useListAppointmentsByPet({
        id_pet: id_pet as string,
        mode: 'done',
    })

    if (isLoading) return <div>Carregando...</div>

    return (
        <section>
            {appointments?.map((appointment) => (
                <CardScheduled key={appointment.id} appointment={appointment} />
            ))}
        </section>
    )
}

export default HistoricPet
