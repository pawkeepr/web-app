'use client'

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
    const [enabled, setEnabled] = useState<Boolean>(false)



    return (
        <>

            <Formik
             initialValues={{ marca: '', inicio:''}}>
                <form>
                    <div>
                        <h5 className='text-center'>Tratamento</h5>
                    </div>

                    <div>
                        <div className='mt-2'>
                            <span>Aplicar medicação?</span>
                            <ControlSwitch/>
                            <div className='grid grid-cols-2'>
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
                            <span>Aplicar vacina?</span>
                            <ControlSwitch/>
                        </div>
                        <div>
                            <span>Aplicar exame?</span>
                            <ControlSwitch/>
                        </div>
                        <div>
                            <span>Possui doença?</span>
                            <ControlSwitch/>
                        </div>
                        <div>
                            <span>Aplicar Nutrição Alimentar?</span>
                            <ControlSwitch/>
                        </div>
                    </div>

                    <div>
                        <button type='submit'>Cancelar Consulta</button>
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