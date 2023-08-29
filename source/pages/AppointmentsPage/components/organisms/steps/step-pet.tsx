/* eslint-disable react/jsx-no-undef */
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


import MaskedInput from "react-input-mask";

import FieldDocument from "~/Components/molecules/field-document/field-document";

import { useFormikContext } from "formik";
import { BtnPrimary } from "~/Components/atoms/btn";
import ControlSwitch from "../../molecules/switch/switch";
import { StepProps } from "./types";

import { InitialValues } from "../../../Appointments";

import { useState, useTransition } from "react";
import FieldControl from "~/Components/molecules/field-control/field-control";

import ComboBoxFields from "~/Components/modals/add-pet-modal/components/organisms/combo-box-fields";
import { SpeciesType } from "~/store/pets/speciesType";
import usePetById from "../../hooks/use-pet-by-id";
import usePetByName from "../../hooks/use-pet-by-name";
import useTutorByDocument from "../../hooks/use-tutor-by-document";
import StepSecondTutor from "../../molecules/second-tutor";
import StepTutor from "../../molecules/tutor";
import HealthInsurance from "../../molecules/health-insurance";



const StepPet = ({ toggleTab, activeTab }: StepProps) => {
    const [isPendingPet, startTransition] = useTransition();
    const [specie, setSpecie] = useState<SpeciesType>({} as SpeciesType);
    const { values, setFieldValue } = useFormikContext<InitialValues>();

    const { isPending: isPendingPetById, petExists } = usePetById({
        onChangeField: setFieldValue,
        id: values.pet?.id,
    });

    const {
        isPending: isPendingTutors,
        petsOptions,
        tutorExists,
    } = useTutorByDocument({
        document: values.tutor?.document || "",
        onChangeField: setFieldValue,
    });

    const { onChangePet, isPending: isPendingChangePet } = usePetByName({
        onChangeField: setFieldValue,
        name: values.pet?.name,
        pets: petsOptions,
    });

    const onChangeSpecie = (specie: SpeciesType) => {
        startTransition(() => {
            setSpecie(specie);
            setFieldValue("breed", "");
            setFieldValue("bloodType", "");
        });
    };

    const isPending =
        isPendingPet ||
        isPendingTutors ||
        isPendingChangePet ||
        isPendingPetById;

    const onlyWords = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /[^a-zA-Z ]/g;
        e.target.value = e.target.value.replace(regex, "");
        console.log(e.target.value);
    };

    return (
        <>
            <div className="p-1 m-2 mb-4">
                <h5 className="font-bold text-center">Pet</h5>
            </div>
            <div className="text-align: left mb-4">Preencha as Informações do PET</div>
            <div>
                <Row className="g-3">
                    {/* <div className="flex flex-row gap-2 items-center justify-center m-2 p-1">
                        <AvatarPet name={values.pet?.name || ''} />
                        <BtnAvatar alt='Avatar de Tutor' name="tutor.avatar" disabled size={24} />
                    </div> */}
                    <ComboBoxFields name="pet" />
                    <div className="p-1 m-2 mb-4">
                        <h5 className="font-bold text-center">Tutor</h5>
                    </div>
                    <div className="text-align: left  mb-2">Preencha as Informações do Tutor</div>
                    <Col sm={3}>
                        <FieldDocument
                            label="CPF"
                            divClassName="my-1"
                            name="tutor.document"
                            aria-label="document"
                            className=" "
                            onlyCPF
                            disabled={isPending || tutorExists}
                            placeholder="CPF"
                            component={MaskedInput as any}
                            required
                        />
                    </Col>
                    <Col sm={5}>
                        <FieldControl
                            initialFocus
                            divClassName="my-1"
                            label="Nome Completo"
                            name="tutor.name"
                            disabled={isPending || tutorExists}
                            aria-label="name"
                            className=" "
                            placeholder="Digite o nome do Tutor"
                            required
                            disabledError
                            onChange={onlyWords}
                        />
                    </Col>
                    <Col sm={4}>
                        <FieldControl
                            className=" "
                            divClassName="my-1"
                            type="text"
                            label="Telefone/Celular"
                            name="tutor.phone"
                            disabled={isPending || tutorExists}
                            placeholder={
                                isPending
                                    ? "Carregando..."
                                    : "Digite o seu Número de Telefone"
                            }
                            component={MaskedInput as any}
                            mask={"(99) 99999-9999"}
                            maskChar={null}
                            required
                        />
                    </Col>
                    <StepTutor disabled={tutorExists} />
                </Row>
                
                <Row className="mt-2">
                    <ControlSwitch
                        label="O pet possui um segundo Tutor?"
                        className="mt-2 mb-4 lg:w-16 lg:h-7 w-[3.72rem] h-6"
                    >
                        <div className="text-align: left mb-2">Preencha as Informações do segundo Tutor</div>
                        <Col sm={3}>
                            <FieldDocument
                                label="CPF"
                                divClassName="my-1"
                                name="secondTutor.document"
                                aria-label="document"
                                
                                onlyCPF
                                disabled={isPending || tutorExists}
                                placeholder="CPF"
                                component={MaskedInput as any}
                                required
                            />
                        </Col>
                        <Col sm={5}>
                            <FieldControl
                                initialFocus
                                divClassName="my-1"
                                label="Nome Completo"
                                name="secondTutor.name"
                                disabled={isPending || tutorExists}
                                aria-label="name"
                                
                                placeholder="Digite o nome do Tutor"
                                required
                                disabledError
                                onChange={onlyWords}
                            />
                        </Col>
                        <Col sm={4}>
                            <FieldControl
                                
                                divClassName="my-1"
                                type="text"
                                label="Telefone/Celular"
                                name="secondTutor.phone"
                                disabled={isPending || tutorExists}
                                placeholder={
                                    isPending
                                        ? "Carregando..."
                                        : "Digite o seu Número de Telefone"
                                }
                                component={MaskedInput as any}
                                mask={"(99) 99999-9999"}
                                maskChar={null}
                                required
                            />
                        </Col>
                        <StepSecondTutor disabled={tutorExists} />
                    </ControlSwitch>
                </Row>

                <Row>
                    <HealthInsurance />
                </Row>
                    
            </div>
            <div className="flex align-items-center justify-end gap-3 mt-4">
                <BtnPrimary
                    type="button"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                />
            </div>
        </>
    );
};

export default StepPet;
