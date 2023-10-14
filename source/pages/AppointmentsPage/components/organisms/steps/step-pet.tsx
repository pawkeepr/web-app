/* eslint-disable react/jsx-no-undef */
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


import MaskedInput from "react-input-mask";

import FieldDocument from "~/Components/molecules/field-document/field-document";
import FieldPhone from "~/Components/molecules/field-phone/field-phone";

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
import HealthInsurance from "../../molecules/health-insurance";
import StepSecondTutor from "../../molecules/second-tutor";
import StepTutor from "../../molecules/tutor";



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
        <div className="card card-body shadow-lg">
            <div className="p-1 m-2 mb-4">
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Informações do PET
                    <br />

                    <span className="text-sm font-bold text-secondary-500">Obrigatório (*)</span>
                </h4>
            </div>
            <div className="text-align: left mb-4">Preencha as Informações do PET</div>
            <div>
                <Row className="g-3">
                    <ComboBoxFields name="pet" />
                    <div className="p-1 m-2 mb-4">
                        <h5 className="font-bold text-center">Tutor
                            <br />
                            <span className="text-sm font-bold text-secondary-500">Obrigatório (*)</span>
                        </h5>
                    </div>
                    <div className="text-align: left  mb-2">Preencha as Informações do Tutor</div>
                    <Col sm={3}>
                        <FieldDocument
                            label="CPF"
                            divClassName="my-1"
                            name="tutor.document"
                            aria-label="document"
                            className="border-1 "
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
                            name="tutor_name"
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
                        <FieldPhone
                            label="Telefone/Celular"
                            divClassName="my-1"
                            name="tutor_phone"
                            disabled={isPending || tutorExists}
                            placeholder={
                                isPending
                                    ? "Carregando..."
                                    : "Digite o seu Número de Telefone"
                            }
                            required
                        />
                    </Col>
                    <StepTutor disabled={tutorExists} />
                </Row>

                <Row className="flex flex-row mt-2">
                    <ControlSwitch
                        label="O pet possui um segundo Tutor?"
                        className="mt-2 mb-4 lg:w-16 lg:h-7 w-[3.72rem] h-6"
                    >
                        <div className="text-align: left mb-2">Preencha as Informações do segundo Tutor</div>
                        <div className="flex w-full gap-3">
                                <Col sm={3}>
                                    <FieldDocument
                                        label="CPF"
                                        divClassName="my-1"
                                        name="tutor.document"
                                        aria-label="document"
                                        className="border-1 "
                                        onlyCPF
                                        disabled={isPending || tutorExists}
                                        placeholder="CPF"
                                        component={MaskedInput as any}
                                        required
                                    />
                                </Col>
                                <FieldControl
                                    initialFocus
                                    divClassName="my-1"
                                    label="Nome Completo"
                                    name="second_tutor.name"
                                    disabled={isPending || tutorExists}
                                    aria-label="name"

                                    placeholder="Digite o nome do Tutor"
                                    required
                                    disabledError
                                    onChange={onlyWords}
                                />
                                <FieldPhone
                                    divClassName="my-1"
                                    type="text"
                                    label="Telefone/Celular"
                                    name="second_tutor.name"
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
                        </div>
                        <StepSecondTutor disabled={tutorExists} />
                    </ControlSwitch>
                </Row>

                <Row>
                    <HealthInsurance />
                </Row>

            </div>
            <div className="flex align-items-center justify-end gap-3 mt-4">
                <BtnPrimary
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                />
            </div>
        </div>
    );
};

export default StepPet;
