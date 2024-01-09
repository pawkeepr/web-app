import MyImage from '~/Components/atoms/my-image/my-image';
import ravena from '~/assets/images/ravena.jpeg';

import { RadioGroup } from '@headlessui/react';
import ViewAppointment from '~/Components/modals/view-appointment/modal-view-appointment';
import { IPetV2 } from '~/types/pet-v2';

type CardPetsProps = {
    pet: IPetV2;
    checked: boolean;
};

const CardPets = ({ pet, checked }: CardPetsProps) => {
    return (
        <div className="space-y-10 w-full">
            <RadioGroup.Option
                key={pet?.name_pet || pet?.pet_data?.name_pet}
                value={pet}
                className={({ active }) =>
                    `${active ? 'ring-2 ring-white/20 ring-offset-2' : ''}
                    ${
                        checked
                            ? 'bg-primary-500 bg-opacity-60 text-white'
                            : 'bg-white'
                    }
                      relative flex cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`
                }
            >
                <>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-around items-center">
                            <MyImage
                                src={ravena}
                                alt="Picture of the author"
                                width={150}
                                height={150}
                                className="h-32 w-32 rounded-full"
                            />

                            <div className="flex flex-col items-center">
                                <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                        checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                >
                                    <h3 className="font-semibold mobile:hidden">
                                        Informações do pet
                                    </h3>
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                        checked
                                            ? 'text-sky-100'
                                            : 'text-gray-500'
                                    }`}
                                >
                                    <div className="p-2 ">
                                        <p className="text-gray-700">
                                            <strong>Nome do pet:</strong>{' '}
                                            {pet?.pet_data?.name_pet ||
                                                pet?.name_pet}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Especie:</strong>{' '}
                                            {pet?.pet_data?.specie ||
                                                pet?.specie}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Sexo:</strong>{' '}
                                            {pet?.pet_data?.sex || pet?.sex}
                                        </p>
                                        <p className="text-gray-700 md:hidden">
                                            <strong>Raça: </strong> {pet?.race}
                                        </p>
                                    </div>
                                </RadioGroup.Description>
                            </div>
                            <div className="flex mobile:hidden flex-col">
                                <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                        checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                >
                                    <h3 className="font-semibold mobile:hidden">
                                        Informações adicionais
                                    </h3>
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                        checked
                                            ? 'text-sky-100'
                                            : 'text-gray-500'
                                    }`}
                                >
                                    <div className="p-2">
                                        <p className="text-gray-700">
                                            <strong>Ano de Nascimento: </strong>
                                            {pet?.date_birth}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Raça: </strong> {pet?.race}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Tipo sanguíneo: </strong>
                                            {pet?.blood_type}
                                        </p>
                                    </div>
                                </RadioGroup.Description>
                            </div>
                        </div>
                        {checked && (
                            <div className="flex justify-end text-white">
                                <ViewAppointment props={pet} />
                            </div>
                        )}
                    </div>
                </>
            </RadioGroup.Option>
        </div>
    );
};

export default CardPets;
