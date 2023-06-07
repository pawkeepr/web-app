import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Formik , Form , Field , ErrorMessage } from 'formik' ;       
import {useState } from 'react';
import ControlSwitch from '../../../molecules/switch/switch';


//Import images

import { StepProps } from '../types';

import { useFormikContext } from 'formik';
import { BtnAvatar, BtnLabel, BtnSuccess } from '~/Components/atoms/btn';
import { InitialValues } from '~/pages/AppointmentsPage/Appointments';
import AvatarPet from '../../../atoms/pet-avatar/pet-avatar';


const StepTreatment = ({ toggleTab, activeTab }: StepProps) => {


    const { values } = useFormikContext<InitialValues>()
 

    const vacinas = [
        {
          id: 1,
          name:'Vermefugo'
        },
        {
          id: 2,
          name:'Febre'
        },
        {
          id: 3,
          name:'Raiva'
        },
      ]
    
      const exames = [
        {
          id: 1,
          name:'Raio X'
        },
        {
          id: 2,
          name:'Exame de Sangue'
        },
        {
          id: 3,
          name:'Check-up'
        },
      ]
    

    return (
        <>

            <Formik
             initialValues={{ marca: '', inicio:''}}>
                <form>
                    <div>
                        <h4 className='text-center'>Tratamento</h4>
                    </div>

                    <div>
                        <div className='mt-2'>
                            <div className='flex justify-between'>
                                <span className='mt-2'>Aplicar medicação?</span>
                                <ControlSwitch className='mt-2 w-16 h-7'/>
                            </div>
                            
                            {/* <div className='flex gap-2 flex-col'>
                                <span>Uso Contínuo?</span>
                                <ControlSwitch/>
                            </div> */}
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col'>
                                    <label>Marca</label>
                                    <Field className='text-black rounded-md' name='marca' type='text'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Início</label>
                                    <Field className='rounded-md' name='inicio' type='text'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Marca</label>
                                    <Field className='text-black rounded-md' name='marca' type='text'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Início</label>
                                    <Field className='rounded-md' name='inicio' type='text'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Marca</label>
                                    <Field className='text-black rounded-md' name='marca' type='text'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Início</label>
                                    <Field className='rounded-md' name='inicio' type='text'/>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2'>
                        <div className='flex justify-between'>
                                <span className='mt-2'>Aplicar vacina?</span>
                                <ControlSwitch className='mt-2 w-16 h-7'/>
                            </div>
                            <div className='mt-2'>
                                {vacinas.map((vacina)=>(
                                    <div>
                                        <p>{vacina.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='mt-2'>
                        <div className='flex justify-between'>
                                <span className='mt-2'>Aplicar exame?</span>
                                <ControlSwitch className='mt-2 w-16 h-7'/>
                            </div>
                            <div className='mt-2 flex flex-col'>
                                {exames.map((exame)=>(
                                    <div className=''>
                                        <p>{exame.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <span className='mt-2'>Possui doença?</span>
                                <ControlSwitch className='mt-2 w-16 h-7'/>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col'>
                                    <label>Marca</label>
                                    <Field className='text-black rounded-md' name='marca' type='text'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Início</label>
                                    <Field className='rounded-md' name='inicio' type='text'/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <span className='mt-2'>Aplicar nutrição alimentar?</span>
                                <ControlSwitch className='mt-2 w-16 h-7'/>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col'>
                                    <label>Marca</label>
                                    <Field className='text-black rounded-md' name='marca' type='text'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label>Início</label>
                                    <Field className='rounded-md' name='inicio' type='text'/>
                                </div>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <span>Informações Obrigatórias</span>
                                <div className='flex flex-col mt-2'>
                                    <label>Peso</label>
                                    <Field className='rounded-md' name='inicio' type='text'/>
                                </div>
                        </div>
                    </div>

                </form>

            </Formik>


            <div className="flex align-items-center justify-end gap-3 mt-4">
                <BtnLabel
                    link
                    type="button"
                    className="right ms-auto previestab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                >
                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                    Voltar
                </BtnLabel>
                <BtnSuccess
                    type="button"
                    className="btn-label right ms-auto nexttab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    Próximo
                    <i className="ri-check-line label-icon align-middle fs-16 ms-2"></i>
                </BtnSuccess>
            </div>
        </>
    )
}

export default StepTreatment