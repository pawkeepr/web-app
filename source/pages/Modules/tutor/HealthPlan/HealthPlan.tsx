import { useState } from 'react'
import MapCardFeedPets from '~/Components/molecules/map-card-feed-pets'
import {
    useListPetsFromTutor,
    type Pet,
} from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import { usePetByIdV2 } from '~/store/hooks/pet-by-id'
import useProfile from '~/store/hooks/profile/use-profile'
import type { IMainResponsibleGuardian, PetData } from '~/types/pet-v2'
import DefaultLayout from '../../_layouts/dashboard'
import PetProfileCard from '../../shared/HistoricPetPage/components/organisms/pet-profile-card'
import CardContainer from '../../shared/ProfilePage/components/CardContainer'
import ContainerHealthPlans from './components/container-health-plans'

const HealthPlan = () => {
    const [selected, setSelected] = useState<Pet | null>(null)
    const {
        data: pets,
        isPending: listPetsPending,
        isFetching: listPetsIsFetching,
    } = useListPetsFromTutor()
    const { data: profile } = useProfile()

    const {
        data: pet,
        isPending: petPending,
        error: petError,
    } = usePetByIdV2(
        profile?.user_information?.cpf_cnpj as string,
        selected?.id_pet as string,
    )

    const handleClick = (pet: Pet) => {
        setSelected(pet)
    }

    return (
        <DefaultLayout title="Planos de Saúde" searchBlock={false}>
            <MapCardFeedPets
                onClick={handleClick}
                pets={pets as Pet[]}
                selected={selected}
                isPending={listPetsPending}
                isLoading={listPetsIsFetching}
            />
            <div className="container mx-auto mobile:pb-24">
                <div className="flex flex-wrap flex-1 mobile:flex-col tablet:flex-col">
                    <div className="flex flex-col flex-1 w-full gap-1 px-2">
                        <PetProfileCard
                            disabled
                            main_responsible_guardian={
                                pet?.main_responsible_guardian as IMainResponsibleGuardian
                            }
                            pet_information={pet?.pet_information as PetData}
                            id={pet?.id}
                        />
                    </div>
                    <div className="w-full flex flex-[3] flex-col px-2 web:my-2 mobile:!flex-1 overflow-hidden">
                        <CardContainer className="w-full bg-white">
                            {selected && (
                                <ContainerHealthPlans id_pet={selected.id_pet} />
                            )}
                            {!selected && (
                                <p className="text-base font-semibold text-center text-gray-600">
                                    Selecione um Pet para ver os Dados
                                </p>
                            )}
                        </CardContainer>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default HealthPlan
