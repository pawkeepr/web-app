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
import ListBoxTailwind from "~/Components/molecules/list-box-tailwind/list-box-tailwind";
import { SpeciesType, species } from "~/store/pets/speciesType";
import{ genderValues } from "~/store/pets/sexType";
import AvatarPet from "../../atoms/pet-avatar";
import usePetById from "../../hooks/use-pet-by-id";
import usePetByName from "../../hooks/use-pet-by-name";
import useTutorByDocument from "../../hooks/use-tutor-by-document";
import StepSecondTutor from "../../molecules/second-tutor";
import { GenderPet } from "~/store/pets/types";

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
                    <Row className="mt-2">
                        <div className="w-full lg:w-1/3 px-3 mb-6">
                            <ListBoxTailwind
                                items={species}
                                option={specie}
                                value={values.pet?.species}
                                onChangeOption={onChangeSpecie}
                                required
                                disabled={isPending || !!values.pet?.id}
                                name="species"
                                placeholder="Ex: Cachorro, Gato, etc..."
                                label="Espécie"
                            />
                        </div>

                        <div className="w-full lg:w-1/3 px-3 mb-6">
                            <ListBoxTailwind
                                items={specie.breedType as any}
                                value={values.pet?.breed}
                                disabled={!!values.pet?.id}
                                required
                                name="breed"
                                label="Raça"
                                placeholder="Ex: Vira-lata, Poodle, etc..."
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-3 mb-6">
                            <ListBoxTailwind
                                items={specie.bloodType as any} 
                                value={values.pet?.bloodType}
                                disabled={!!values.pet?.id}
                                name="bloodType"
                                label="Tipo Sanguíneo"
                                placeholder="Ex: A, B, etc..."
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-3 mb-6">
                            <ListBoxTailwind
                                items={genderValues as any}
                                value={values.pet?.sex}
                                //disabled={!!values.pet?.id}
                                name="sex"          // Lista d sexo
                                label="Sexo do Pet"
                                placeholder="Masculino Feminino..."
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-3 mb-6">
                        <FieldControl
                                label={`Data de nascimento`}
                                className="form-control"
                                name={`date_birth`}
                                type="date"
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-3 mb-6">
                        <FieldControl
                                label={`Número do microchip`}
                                className="form-control"
                                name={`chip_number`}
                                type="number"
                            />
                        </div>
                        <div className="w-full lg:w-1/3 px-3 mb-6">
                        <FieldControl
                                label={`Número de registro cartório`}
                                className="form-control"
                                name={`id_office_register`}
                                type="number" //aterar conforme padrão do tipo number/string
                            />
                        </div>
                    </Row>
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
                </Row>
                <Row className="g-3">
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
                                className="form-control"
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
                                className="form-control"
                                placeholder="Digite o nome do Tutor"
                                required
                                disabledError
                                onChange={onlyWords}
                            />
                        </Col>
                        <Col sm={4}>
                            <FieldControl
                                className="form-control"
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
            </div>
            <div className="flex align-items-center justify-end gap-3 mt-4">
                <BtnPrimary
                    type="button"
                    className="ml-4 btn-label right ms-auto nexttab nexttab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <span className="ml-1"> Próximo </span>
                    <i className="ri-arrow-right-line  align-middle fs-16 ms-2 p-1"></i>
                </BtnPrimary>
            </div>
        </>
    );
};

export default StepPet;
