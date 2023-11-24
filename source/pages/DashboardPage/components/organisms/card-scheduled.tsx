import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import MyImage from "~/Components/atoms/my-image";
import ViewAppointment from "~/Components/modals/view-appointment/modal-view-appointment";
import ravena from "~/assets/images/ravena.jpeg";
import { IAppointmentVet } from "~/store/slices/appointment-vet/types";

type CardScheduledProps = {
    checked: boolean;
    appointment: IAppointmentVet;
}

const CardScheduled = ({ checked, appointment }: CardScheduledProps) => {
    return (
            <div className="space-y-10 w-full">
                <RadioGroup.Option
                  key={appointment?.name_tutor}
                  value={appointment}
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
    
                          <div className="flex flex-col mobile:hidden items-center">
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
                                    <p className="text-gray-700">Nome do pet: {appointment?.pet_data?.name_pet}</p>
                                    <p className="text-gray-700">Especie: { appointment?.pet_data?.specie}</p>
                                    <p className="text-gray-700">Sexo: {appointment?.pet_data?.sex}</p>
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
                              {'Informações Do Tutor:'}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? 'text-sky-100' : 'text-gray-500'
                              }`}
                            >
                              <div className="p-2">
                                    <p className="text-gray-700">Nome: {appointment?.tutor_data?.name}</p>
                                    <p className="text-gray-700">Email: {appointment?.tutor_data.email}</p>
                                </div>
                            </RadioGroup.Description>
                            
                          </div>
                        </div>
                        {checked && (
                          <div className="flex justify-end text-white">
                            <ViewAppointment props={appointment} />
                          </div>
                        )}
                      </div>
                    </>
                </RadioGroup.Option>
            </div>
    );
}

export default CardScheduled