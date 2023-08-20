import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import MaskedInput from "react-input-mask";

import FieldDocument from "~/Components/molecules/field-document/field-document";

import { useFormikContext } from "formik";
import { BtnPrimary } from "~/Components/atoms/btn";
import { StepProps } from "./types";

import { InitialValues } from "../../../Appointments";

import { useState, useTransition } from "react";
import FieldControl from "~/Components/molecules/field-control/field-control";
import ListBoxTailwind from "~/Components/molecules/list-box-tailwind/list-box-tailwind";
import { SpeciesType, species } from "~/store/pets/speciesType";
import usePetById from "../../hooks/use-pet-by-id";
import usePetByName from "../../hooks/use-pet-by-name";
import useTutorByDocument from "../../hooks/use-tutor-by-document";
import StepTutor from "../../molecules/tutor";
import ControlSwitch from "../../molecules/switch/switch";

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
                <h5>Pet</h5>
                <p className="text-muted">Todas as Informações sobre o PET</p>
            </div>

            <div>
                <Row className="g-3">
                    {/* <div className="flex flex-row gap-2 items-center justify-center m-2 p-1">
                        <AvatarPet name={values.pet?.name || ''} />
                        <BtnAvatar alt='Avatar de Tutor' name="tutor.avatar" disabled size={24} />
                    </div> */}
                    <Col sm={3}>
                        <FieldDocument
                            label="CPF"
                            divClassName="my-1"
                            name="tutor.document"
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
                            name="tutor.name"
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
                    </Row>
                </Row>
                
                <Row className="g-3">
                    <StepTutor disabled={tutorExists} />
                </Row>
                <Row>
                <ControlSwitch
                        label="O pet é doador de sangue?"
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7"
                    >
                </ControlSwitch>
                <ControlSwitch
                        label="O pet é doador de orgão?"
                        className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7"
                    >
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
