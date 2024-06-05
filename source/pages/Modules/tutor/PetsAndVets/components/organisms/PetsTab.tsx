import { useRouter } from 'next/router'
import { MdPets } from 'react-icons/md'
import { BtnLinkFloating } from '~/Components/molecules/btn-floating/btn-floating'
import CardPets from '~/Components/organism/card-pets'
import { useListPetsFromTutor } from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import useProfile from '~/store/hooks/profile/use-profile'
import type { Breed } from '~/types/breedType'
import type { On_Off } from '~/types/pet-v2'
import type { Species } from '~/types/speciesType'

const PetsTab = () => {
    const { data } = useProfile()
    const router = useRouter()

    const { data: pets, isPending } = useListPetsFromTutor()

    if (isPending) return <div>Loading...</div>

    return (
        <section className="w-full px-4 mobile:!px-2">
            {pets?.map((pet) => (
                <CardPets
                    key={pet?.id}
                    pet={{
                        cpf_cnpj: data?.user_information?.cpf_cnpj as string,
                        id_pet: pet?.id as string,
                        name_pet: pet?.pet_information?.name_pet as string,
                        race: pet?.pet_information?.race as Breed,
                        sex: pet?.pet_information?.sex as string,
                        specie: pet?.pet_information?.specie as Species,
                        date_birth: pet?.pet_information?.date_birth,
                        blood_donator: pet?.pet_information
                            ?.blood_donator as On_Off,
                        castrated: pet?.pet_information?.castrated as boolean,
                        blood_type: pet?.pet_information?.blood_type as string,
                    }}
                />
            ))}
            {pets?.length === 0 && (
                <div className="text-center">
                    <span>Não há Pets Cadastrados</span>
                </div>
            )}
            <BtnLinkFloating
                icon={() => <MdPets className="w-6 h-4" />}
                title="Novo Pet"
                href="/tutor/pet"
            />
        </section>
    )
}

export default PetsTab
