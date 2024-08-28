import useVetById from "~/store/hooks/vet-by-id/use-vets"

type VeterinaryProfilePageProps = {
    id_vet: string
}

const VeterinaryProfilePage = ({id_vet} : VeterinaryProfilePageProps) => {
    const {data: profile } = useVetById(id_vet)
    console.log(profile)
    return (
        <>
            <p>{ `Esse é o perfil público do veterinário`}</p>
        </>
    )
}


export default VeterinaryProfilePage