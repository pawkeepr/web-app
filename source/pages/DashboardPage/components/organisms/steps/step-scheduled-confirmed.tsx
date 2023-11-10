import { sample } from "cypress/types/lodash";
import Link from "next/link";
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import MyImage from "~/Components/atoms/my-image";
import { IAppointmentVet } from "~/store/slices/appointment-vet/types";
import { CheckIcon } from "@heroicons/react/24/solid";
import ravena from "~/assets/images/ravena.jpeg";
import { useAppSelector } from "~/store/hooks";
import QRcode from '~/Components/molecules/qr-code'

const plans = [
    {
      name: 'Franciellem',
      pet: 'Ravena',
      date: '08/12/2023',
      hours: '10:00',
      day: 'Quarta-feira',
      email: 'jainefranciellen@gmail.com',
      contact: '(11) 9 9999-9999',
      crmv_vet: '123456',
      cpf_cnpj_vet: '123.456.789-10',
    },
    {
        name: 'Franciellem',
        pet: 'Ravena',
        date: '08/12/2023',
        hours: '10:00',
        day: 'Quarta-feira',
        email: 'jainefranciellen@gmail.com',
        contact: '(11) 9 9999-9999',
        crmv_vet: '123456',
        cpf_cnpj_vet: '123.456.789-10',
      },
      {
        name: 'Franciellem',
        pet: 'Ravena',
        date: '08/12/2023',
        hours: '10:00',
        day: 'Quarta-feira',
        email: 'jainefranciellen@gmail.com',
        contact: '(11) 9 9999-9999',
        crmv_vet: '123456',
        cpf_cnpj_vet: '123.456.789-10',
      },
      {
        name: 'Franciellem',
        pet: 'Ravena',
        date: '08/12/2023',
        hours: '10:00',
        day: 'Quarta-feira',
        email: 'jainefranciellen@gmail.com',
        contact: '(11) 9 9999-9999',
        crmv_vet: '123456',
        cpf_cnpj_vet: '123.456.789-10',
      },
  ]

const StepConfirmed = (appointment: IAppointmentVet) => {
    const [selected, setSelected] = useState(plans[0])
    

    const pet = useAppSelector(state => state.scheduled.all_scheduled_confirmed);
    console.log(pet);
    
    return (

          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only ">Server size</RadioGroup.Label>
            <div className="space-y-10 w-full">
           
              {plans.map((plan) => (
                <RadioGroup.Option
                  key={plan.name}
                  value={plan}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-2 ring-white/20 ring-offset-2'
                        : ''
                    }
                    ${checked ? 'bg-primary-500 text-white' : 'bg-white'}
                      relative flex cursor-pointer rounded-lg px-2 py-2 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex flex-col w-full">
                        <div className="flex mobile:gap-4 justify-around items-center">
                            <MyImage
                                src={ravena}
                                alt="Picture of the author"
                                width={150}
                                height={150}
                                className="h-32 mt-3 w-32 rounded-full"
                            />

                          <div className="flex flex-col items-center">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {'Informações Do Agendamento:'}
                            </RadioGroup.Label>
                            <div className="">
                                <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                    checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                                >
                               <div className="p-2">
                              
                                    <p className="text-gray-700 md:hidden">Nome do pet: Ravena</p>
                                    <p className="text-gray-700">Data: 10 de Novembro de 2023</p>
                                    <p className="text-gray-700">Horário: 15:00 - 16:00</p>
                                    <p className="text-gray-700 md:hidden">Contato: 79-996733389</p>
                                </div>
                                </RadioGroup.Description>
                            </div>
                            
                          </div>
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
                                    <p className="text-gray-700">Nome do pet: Ravena</p>
                                    <p className="text-gray-700">Especie: Gato</p>
                                    <p className="text-gray-700">Sexo: Feminino</p>
                                    <p className="text-gray-700">Microchip: 1294</p>
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
                                    <p className="text-gray-700">Nome: Jaine Franciellem</p>
                                    <p className="text-gray-700">Email: jainefranciellen@gmail.com</p>
                                    <p className="text-gray-700">Contato: 79-996733389</p>
                                </div>
                            </RadioGroup.Description>
                            
                          </div>
                          <div className="flex mobile:hidden flex-col">
                              <QRcode url="#" />
                          </div>
                        </div>                        
                        {checked && (
                          <div className="flex justify-end text-white">
                            <CheckIcon className="h-6 w-8" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
    );
};

export default StepConfirmed;
