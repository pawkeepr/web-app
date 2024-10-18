import MapCardFeedPets from '~/Components/molecules/map-card-feed-pets'
import SelectPetProvider from '~/hooks/use-selected-pet'
import type { Pet } from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import type { IMainResponsibleGuardian, PetData } from '~/types/pet-v2'
import DefaultLayout from '../../_layouts/dashboard'
import PetProfileCard from '../../shared/HistoricPetPage/components/organisms/pet-profile-card'
import CardContainer from '../../shared/ProfilePage/components/CardContainer'
import ContainerHealthPlans from './components/container-health-plans'

const HealthPlanPage = () => {
    return (
        <DefaultLayout title="Planos de Saúde" searchBlock={false}>
            <SelectPetProvider>
                {({
                    listPetsIsFetching,
                    listPetsPending,
                    onChangeSelectedPet,
                    pets,
                    pet,
                    selected,
                }) => (
                    <>
                        <MapCardFeedPets
                            onClick={onChangeSelectedPet}
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
                                        pet_information={
                                            pet?.pet_information as PetData
                                        }
                                        id={pet?.id}
                                    />
                                </div>
                                <div className="w-full flex flex-[3] flex-col px-2 web:my-2 mobile:!flex-1 overflow-hidden">
                                    <CardContainer className="w-full bg-white">
                                        <ContainerHealthPlans />
                                    </CardContainer>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </SelectPetProvider>
        </DefaultLayout>
    )
}

export default HealthPlanPage
