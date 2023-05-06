
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MaskedInput from 'react-input-mask';

import FieldDocument from "~/Components/molecules/field-document/field-document";

import { useFormikContext } from 'formik';
import { useEffect, useState, useTransition } from 'react';
import { BtnAvatar } from '~/Components/atoms/btn';
import ComboBoxFields from '~/Components/modals/modal-add-pet/components/organisms/combo-box-fields/combo-box-fields';
import ComboBoxAutocomplete from '~/Components/molecules/combo-box-autocomplete/combo-box-autocomplete';
import { StepProps } from './types';

import { InitialValues } from '../../../Appointments';

import FieldControl from '~/Components/molecules/field-control/field-control';
import { useAppSelector } from '~/store/hooks';
import { Pet } from '~/store/pets/types';

const StepPet = ({ toggleTab, activeTab }: StepProps) => {


    const [petsOptions, setPetsOptions] = useState<(Pet & { value: string })[]>([])
    const [isPending, startTransition] = useTransition()
    const { values, setFieldValue } = useFormikContext<InitialValues>()


    const { pets, tutors } = useAppSelector(state => ({
        pets: state.Pets.pets,
        tutors: state.Tutor.tutors
    })
    )

    useEffect(() => {
        const document = values.tutor?.document
        const documentNumber = document?.replace(/\D/g, '')

        if (!documentNumber || documentNumber.length < 11) {
            return
        }

        const tutor = tutors.find(tutor => tutor.document === documentNumber)
        const petsOptions = pets
            .filter(pet => pet.ownerEmergencyContact.document === documentNumber)
            .map(pet => ({
                ...pet,
                value: pet.id,
            }))

        if (!tutor) {
            // setar erro de cliente não está cadastrado
        }

        startTransition(() => {
            setPetsOptions(petsOptions)
            setFieldValue('tutor.id', tutor?.id || '')
            setFieldValue('tutor.phone', tutor?.phone || '')
            setFieldValue('tutor.name', tutor?.name || '')
            setFieldValue('tutor.email', tutor?.email || '')
            setFieldValue('tutor.avatar', tutor?.avatar || '')
            tutor?.address && setFieldValue('tutor.address', tutor?.address)
        })


        // setar tutor


    }, [values.tutor?.document, tutors, pets, setFieldValue])

    const onChangePet = (pet: Pet) => {
        startTransition(() => {
            setFieldValue('pet.id', pet.id)
            setFieldValue('pet.avatar', pet.avatar)
            setFieldValue('pet.breed', pet.breed)
            setFieldValue('pet.species', pet.species)
            setFieldValue('pet.bloodType', pet.bloodType)
            setFieldValue('pet.gender', pet.gender)
            setFieldValue('pet.dateOfBirth', pet.dateOfBirth)
        })
    }

    return (
        <>
            <div>
                <h5>Pet</h5>
                <p className="text-muted">
                    Todas as Informações sobre o PET
                </p>
            </div>

            <div>
                <Row className="g-3">
                    <BtnAvatar alt='Avatar do Pet' name="pet.avatar" />

                    <Col sm={6}>
                        <FieldDocument
                            label='CPF'
                            divClassName='my-1'
                            name="tutor.document"
                            aria-label="document"
                            className="form-control"
                            onlyCPF
                            placeholder="CPF"
                            component={MaskedInput as any}
                            required
                        />
                    </Col>

                    <Col sm={6}>
                        <FieldControl
                            className="form-control"
                            divClassName='my-1'
                            type="text"
                            label="Telefone/Celular"
                            name="tutor.phone"
                            disabled={isPending}
                            placeholder={isPending ? 'Carregando...' : "Digite o seu Número de Telefone"}
                            component={MaskedInput as any}
                            mask={"(99) 99999-9999"}
                            maskChar={null}
                            required
                        />
                    </Col>

                    <Col sm={12}>
                        <ComboBoxAutocomplete
                            items={petsOptions}
                            name='pet.name'
                            className="form-control"
                            disabled={isPending}
                            required
                            label="Qual é o nome do pet?"
                            placeholder={isPending ? 'Carregando...' : "Digite o nome do pet: Doguinho"}
                            onChangeOption={onChangePet}
                        />
                    </Col>

                    <Row className="mt-2">
                        <ComboBoxFields name="pet" />
                    </Row>
                </Row>
            </div>

            <div className="d-flex align-items-start gap-3 mt-4">
                <button
                    type="button"
                    className="btn btn-success btn-label right ms-auto nexttab nexttab"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                    Go to Shipping
                </button>
            </div>
        </>
    )
}

export default StepPet