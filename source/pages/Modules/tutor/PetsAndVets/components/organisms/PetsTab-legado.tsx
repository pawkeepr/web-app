import { MdPets } from 'react-icons/md'
import BtnFloating from '~/Components/molecules/btn-floating-expansible'
import CardPets from '~/Components/organism/card-pets'
import { useListPetsFromTutor } from '~/store/hooks/list-pets-by-tutor/use-list-pet-by-tutor'
import useProfile from '~/store/hooks/profile/use-profile'

const PetsTab = () => {
    const { data: pets, isPending } = useListPetsFromTutor()
    const { data: profile } = useProfile()

    return (
        <section className="w-full px-4 mobile:!px-2">
            {!isPending && pets?.length === 0 && (
                <div className="text-center">
                    <span>Não há Pets Cadastrados</span>
                </div>
            )}

            {!isPending &&
                pets?.map((pet) => (
                    <CardPets
                        key={pet.id_pet}
                        pet={{
                            ...pet,
                            cpf_cnpj: profile?.user_information?.cpf_cnpj as string,
                            castrated: pet.castrated,
                        }}
                    />
                ))}

            <BtnFloating
                childLinks={[
                    {
                        icon: MdPets,
                        title: 'Adicionar Pet',
                        href: '/pets-and-vets/add-pet',
                    },
                ]}
            />
        </section>
    )
}

export default PetsTab
