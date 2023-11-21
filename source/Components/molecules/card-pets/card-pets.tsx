import MyImage from '~/Components/atoms/my-image/my-image';
import ravena from '~/assets/images/ravena.jpeg';

import { Data } from '~/store/slices/pets/types';
import { RadioGroup } from '@headlessui/react';
import ViewAppointment from '~/Components/modals/view-appointment/modal-view-appointment';

type CardPetsProps = {
    pet: Data
    checked: boolean
}

const CardPets = ({ pet, checked}: CardPetsProps) => {

    return (
        <div className="space-y-10 mt-3 w-full">
                <RadioGroup.Option
                  key={pet?.name_tutor}
                  value={pet}
                  className={({ active }) =>
                    `${
                      active
                        ? 'ring-2 ring-white/20 ring-offset-2'
                        : ''
                    }
                    ${checked ? 'bg-primary-500 bg-opacity-60 text-white' : 'bg-white'}
                      relative flex cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`
                  }
                >
                    <>
                      <div className="flex flex-col w-full">
                        <div className="flex mobile:gap-3 justify-around items-center">
                            <MyImage
                                src={ravena}
                                alt="Picture of the author"
                                width={150}
                                height={150}
                                className="h-32 mt-3 w-32 rounded-full"
                                />
                            <div className='flex justify-center items-center gap-3'>

    
                          <div className="flex flex-col items-center">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {'Informações Do Pet:'}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? 'text-sky-100' : 'text-gray-500'
                              }`}
                            >   
                              <div className="p-2 ">
                                    <p className="text-gray-700"><span className='font-semibold'>Nome do pet</span>: {pet?.pet_data.name_pet}</p>
                                    <p className="text-gray-700"><span className='font-semibold'>Especie:</span>{ pet?.pet_data.specie} Vira-Lata</p>
                                    <p className="text-gray-700"><span className='font-semibold'>Sexo:</span>{pet?.pet_data.sex}</p>
                                    <p className="text-gray-700"><span className='font-semibold'>Castrado:</span>{pet?.pet_data.castrated} Sim</p>
                                </div>
                            </RadioGroup.Description>
                            </div>
                          </div>
                          
                          <div className="flex mobile:hidden flex-col">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {'Informações Do Tutor:'}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? 'text-sky-100' : 'text-gray-500'
                              }`}
                            >
                              <div className="p-2">
                                    <p className="text-gray-700"><span className='font-semibold'>Nome:</span> {pet?.name_tutor}</p>
                                    <p className="text-gray-700"><span className='font-semibold'>Contato: </span>{pet?.contact_tutor.phone}</p>
                                    <p className="text-gray-700"><span className='font-semibold'>Email: </span>{pet?.contact_tutor.email}</p>
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
    )
}

export default CardPets