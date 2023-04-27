
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MaskedInput from 'react-input-mask';

import FieldDocument from "~/Components/molecules/field-document/field-document";

import { useFormikContext } from 'formik';
import { useEffect, useState, useTransition } from 'react';
import { BtnAvatar, BtnSuccess } from '~/Components/atoms/btn';
import ComboBoxAutocomplete from '~/Components/molecules/combo-box-autocomplete/combo-box-autocomplete';
import { StepProps } from './types';

import { InitialValues } from '../../../Appointments';

import FieldControl from '~/Components/molecules/field-control/field-control';
import ListBoxTailwind from '~/Components/molecules/list-box-tailwind/list-box-tailwind';
import { useAppSelector } from '~/store/hooks';
import { SpeciesType, species } from '~/store/pets/speciesType';
import { Pet } from '~/store/pets/types';
import StepTutor from '../../molecules/tutor';

const StepPet = ({ toggleTab, activeTab }: StepProps) => {

    const [isPending, startTransition] = useTransition()

    const [specie, setSpecie] = useState<SpeciesType>({} as SpeciesType)
    const [breed, setBreed] = useState('')
    const [bloodType, setBloodType] = useState('')

    const [petsOptions, setPetsOptions] = useState<(Pet & { value: string })[]>([])
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

    }, [values.tutor?.document, tutors, pets, setFieldValue])

    const onChangePet = (pet: Pet) => {
        console.log(specie)

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

    const onChangeSpecie = (specie: SpeciesType) => {
        startTransition(() => {
            setSpecie(specie)
            setFieldValue('breed', '')
            setFieldValue('bloodType', '')
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
                    <div className="flex flex-row gap-2 items-center justify-center m-2">
                        <BtnAvatar alt='Avatar do Pet' name="pet.avatar" disabled size={40} />
                        <BtnAvatar alt='Avatar de Tutor' name="tutor.avatar" disabled size={24} />
                    </div>
                    <Col sm={3}>
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
                    <Col sm={5}>
                        <FieldControl
                            initialFocus
                            divClassName='my-1'
                            label='Nome Completo'
                            name="tutor.name"
                            aria-label="name"
                            className="form-control"
                            placeholder="Digite o nome do Tutor"
                            required
                            disabledError
                        />
                    </Col>
                    <Col sm={4}>
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
                        <div className="w-full lg:w-1/3 px-3 mb-6">
                            <ListBoxTailwind
                                items={species}
                                option={specie}
                                onChangeOption={onChangeSpecie}
                                required
                                disabled={isPending || !!values.pet?.id}
                                name='species'
                                placeholder="Ex: Cachorro, Gato, etc..."
                                label="Espécie"
                            />
                        </div>

                        <div className="w-full lg:w-1/3 px-3 mb-6">

                            <ListBoxTailwind
                                items={specie.breedType as any}
                                option={{ name: breed, value: breed }}
                                optionSelected={breed}
                                disabled={!specie.breedType || !!values.pet?.id}
                                required
                                name='breed'
                                label="Raça"
                                placeholder="Ex: Vira-lata, Poodle, etc..."
                            />

                        </div>

                        <div className="w-full lg:w-1/3 px-3 mb-6">

                            <ListBoxTailwind
                                items={specie.bloodType as any}
                                option={{ name: bloodType, value: bloodType }}
                                optionSelected={bloodType}
                                disabled={!specie.bloodType || isPending || !!values.pet?.id}
                                name='bloodType'
                                label="Tipo Sanguíneo"
                                placeholder="Ex: A, B, etc..."
                            />

                        </div>
                    </Row>

                </Row>

                <Row className="g-3">

                    <StepTutor />

                </Row>
            </div>

            <div className="d-flex align-items-start gap-3 mt-4">
                <BtnSuccess
                    type="button"
                    className="btn-label right ms-auto nexttab nexttab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                    Próximo
                </BtnSuccess>
            </div>
        </>
    )
}

export default StepPet