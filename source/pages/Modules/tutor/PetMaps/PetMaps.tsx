import MapCardFeedPets from '~/Components/molecules/map-card-feed-pets'
import useSelectedPet from '~/hooks/use-selected-pet'
import type { Pet } from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import type { IMainResponsibleGuardian, PetData } from '~/types/pet-v2'
import DefaultLayout from '../../_layouts/dashboard'
import PetProfileCard from '../../shared/HistoricPetPage/components/organisms/pet-profile-card'
import CardContainer from '../../shared/ProfilePage/components/CardContainer'
import ContainerLocalizations from './components/container-localizations'

const PetMaps = () => {
    const {
        onChangeSelectedPet,
        listPetsIsFetching,
        listPetsPending,
        pet,
        pets,
        selected,
    } = useSelectedPet()
    return (
        <DefaultLayout title="Localização dos Pets" searchBlock={false}>
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
                            pet_information={pet?.pet_information as PetData}
                            id={pet?.id}
                        />
                    </div>
                    <div className="w-full flex flex-[3] flex-col px-2 web:my-2 mobile:!flex-1 overflow-hidden">
                        <CardContainer className="w-full bg-white">
                            {selected && (
                                <ContainerLocalizations
                                    id_pet={pet?.id as string}
                                />
                            )}
                            {!selected && (
                                <p className="text-base font-semibold text-center text-gray-600">
                                    Selecione um Pet para ver o histórico de
                                    localização
                                </p>
                            )}
                        </CardContainer>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default PetMaps
