import { RadioGroup } from '@headlessui/react';
import React, { useCallback, useState } from 'react';
import AddNewAppointment from '~/Components/modals/add-appointment/add-appointment-modal';
import ModalAddPet from '~/Components/modals/add-pet-modal';
import CardPets from '~/Components/molecules/card-pets';
import SearchInput from '~/Components/molecules/search-input';
import ListTab from '~/Components/templates/ListTab';
import { useAppSelector } from '~/store/hooks';
import { BirdBreed, CatBreed } from '~/store/slices/pets/breedType';
import { Gender } from '~/store/slices/pets/speciesType';
import { Data, Species } from '~/store/slices/pets/types';

const PetsTab = () => {
    const pets: Data[] = [
        {
        id: "12345789",
        name_tutor: "João Silva",
        phone_tutor: "(11) 91234-5678",
        contact_tutor: {
            email: "joao@example.com",
            phone: "(11) 98765-4321",
            whatsapp: "5511987654321"
        },
        has_second_tutor: true,
        cpf_tutor: "123.456.789-00",
        vets_data: ["Veterinário 1", "Veterinário 2"],
        location_tutor: {
            country: "Brasil",
            zipCode: "01234-567",
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Centro",
            street: "Rua Exemplo",
            number: "123",
            complement: "Apto 101"
        },
        pet_data: {
            name_pet: 'Rex',
            specie: Species,
            race: BirdBreed,
            sex: Gender.female,
            castrated: true,
            microchip: '123456789012345',
            identification_number: 'ID123',
            blood_type: 'AB+',
            blood_donator: 'No',
            organ_donor: 'No',
            date_birth: '2019-05-15'
        
        },
        health_insurance: {
            name: "Seguradora Pet",
            type_health: "Plano de Saúde Pet",
            number_health: "ABC123XYZ",
            validity: "01/2024"
        },
        responsible_tutors: {
            name_tutor: "Maria Silva",
            cpf_tutor: "987.654.321-00"
        }
    },
    {
        id: "1346789",
        name_tutor: "João Silva",
        phone_tutor: "(11) 91234-5678",
        contact_tutor: {
            email: "joao@example.com",
            phone: "(11) 98765-4321",
            whatsapp: "5511987654321"
        },
        has_second_tutor: true,
        cpf_tutor: "123.456.789-00",
        vets_data: ["Veterinário 1", "Veterinário 2"],
        location_tutor: {
            country: "Brasil",
            zipCode: "01234-567",
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Centro",
            street: "Rua Exemplo",
            number: "123",
            complement: "Apto 101"
        },
        pet_data: {
            name_pet: 'Rex',
            specie: Species,
            race: BirdBreed,
            sex: Gender.female,
            castrated: true,
            microchip: '123456789012345',
            identification_number: 'ID123',
            blood_type: 'AB+',
            blood_donator: 'No',
            organ_donor: 'No',
            date_birth: '2019-05-15'
        
        },
        health_insurance: {
            name: "Seguradora Pet",
            type_health: "Plano de Saúde Pet",
            number_health: "ABC123XYZ",
            validity: "01/2024"
        },
        responsible_tutors: {
            name_tutor: "Maria Silva",
            cpf_tutor: "987.654.321-00"
        }
    },
    {
        id: "12345678",
        name_tutor: "João Silva",
        phone_tutor: "(11) 91234-5678",
        contact_tutor: {
            email: "joao@example.com",
            phone: "(11) 98765-4321",
            whatsapp: "5511987654321"
        },
        has_second_tutor: true,
        cpf_tutor: "123.456.789-00",
        vets_data: ["Veterinário 1", "Veterinário 2"],
        location_tutor: {
            country: "Brasil",
            zipCode: "01234-567",
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Centro",
            street: "Rua Exemplo",
            number: "123",
            complement: "Apto 101"
        },
        pet_data: {
            name_pet: 'Rex',
            specie: Species,
            race: BirdBreed,
            sex: Gender.female,
            castrated: true,
            microchip: '123456789012345',
            identification_number: 'ID123',
            blood_type: 'AB+',
            blood_donator: 'No',
            organ_donor: 'No',
            date_birth: '2019-05-15'
        
        },
        health_insurance: {
            name: "Seguradora Pet",
            type_health: "Plano de Saúde Pet",
            number_health: "ABC123XYZ",
            validity: "01/2024"
        },
        responsible_tutors: {
            name_tutor: "Maria Silva",
            cpf_tutor: "987.654.321-00"
        }
    },
    {
        id: "12345679",
        name_tutor: "João Silva",
        phone_tutor: "(11) 91234-5678",
        contact_tutor: {
            email: "joao@example.com",
            phone: "(11) 98765-4321",
            whatsapp: "5511987654321"
        },
        has_second_tutor: true,
        cpf_tutor: "123.456.789-00",
        vets_data: ["Veterinário 1", "Veterinário 2"],
        location_tutor: {
            country: "Brasil",
            zipCode: "01234-567",
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Centro",
            street: "Rua Exemplo",
            number: "123",
            complement: "Apto 101"
        },
        pet_data: {
            name_pet: 'Rex',
            specie: Species,
            race: BirdBreed,
            sex: Gender.female,
            castrated: true,
            microchip: '123456789012345',
            identification_number: 'ID123',
            blood_type: 'AB+',
            blood_donator: 'No',
            organ_donor: 'No',
            date_birth: '2019-05-15'
        
        },
        health_insurance: {
            name: "Seguradora Pet",
            type_health: "Plano de Saúde Pet",
            number_health: "ABC123XYZ",
            validity: "01/2024"
        },
        responsible_tutors: {
            name_tutor: "Maria Silva",
            cpf_tutor: "987.654.321-00"
        }
    }
]
    

    const Modal = () => <ModalAddPet />
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState("");

    const filter = useCallback((deferredPets: Data[], search: string) => {

        if (!search.trim()) return pets;

        return deferredPets.filter(pet => {
            const lowerSearch = search.toLowerCase();
            return pet.name.toLowerCase().includes(lowerSearch)
                || pet.breed.toLowerCase().includes(lowerSearch)
                || pet.ownerEmergencyContact.name.toLowerCase().includes(lowerSearch)
                || pet.ownerEmergencyContact.phone.toLowerCase().includes(lowerSearch)

        })
    }, [pets])

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const search = e.target.value.toLowerCase();
            setSearch(search);
        },
        [filter]
    );

    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <div
                    className="team-list w-1/2 list-view-filter col-span-8"
                    style={{ marginTop: 12 }}
                >
                    <SearchInput
                        value={search}
                        onChange={handleSearch}
                        placeholder="Busque a Consulta..."
                        className="rounded-md"
                    />
                </div>

                <div className="flex col-span-4 items-center gap-2">
                    <Modal />
                    <div className='mobile:hidden'>
                        <AddNewAppointment />
                    </div>
                </div>
            </div>
            <RadioGroup value={selected} onChange={setSelected}>
                {/* <RadioGroup.Label className="sr-only ">Server size</RadioGroup.Label> */}
                {/* <div className="space-y-10 w-full"> */}
                    {pets?.map(pet => (
                        <CardPets key={pet?.id} pet={pet} checked={selected === pet} />
                    ))}
                {/* </div> */}
            </RadioGroup>
        </React.Fragment>
    );
};

export default PetsTab;