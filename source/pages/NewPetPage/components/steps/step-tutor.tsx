
import FieldDocument from "~/Components/molecules/field-document/field-document";
import FieldPhone from "~/Components/molecules/field-phone/field-phone";

import { useFormikContext } from "formik";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import ControlSwitch from "~/Components/molecules/control-switch-div/switch";

import FieldControl from "~/Components/molecules/field-control/field-control";

import { StepProps } from "~/types/helpers";
import usePetById from "../hooks/use-pet-by-id";
import useTutorByDocument from "../hooks/use-tutor-by-document";
import AddressTutor from "../molecules/address-tutor.tsx";


const StepTutor = ({ toggleTab, activeTab }: StepProps) => {
    const { values, setFieldValue } = useFormikContext<any>();

    const { isPending: isPendingPetById } = usePetById({
        onChangeField: setFieldValue,
        id: values.pet_data?.id,
    });

    const {
        isPending: isPendingTutors,
        tutorExists,
    } = useTutorByDocument({
        document: values.cpf_tutor || "",
        onChangeField: setFieldValue,
    });

    const isPending =
        isPendingTutors ||
        isPendingPetById;

    const onlyWords = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /[^a-zA-Z ]/g;
        e.target.value = e.target.value.replace(regex, "");
    };

    return (
        <div className="card card-body shadow-lg">
            <div className="p-1 m-2 mb-4">
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Informações do Tutor
                    <br />

                    <span className="text-sm font-bold text-secondary-500">Obrigatório (*)</span>
                </h4>
            </div>
            <div className="flex flex-col flex-1 gap-2">
                <div className="mb-2">Preencha as Informações do Tutor</div>
                <div className="grid grid-cols-3 mobile:grid-cols-1 gap-2">
                    <FieldDocument
                        label="CPF"
                        name="cpf_tutor"
                        aria-label="document"
                        typeDocument="cpf"
                        disabled
                        placeholder="CPF"
                        required
                    />
                    <FieldControl
                        initialFocus
                        label="Nome Completo"
                        name="name_tutor"
                        disabled={isPending || tutorExists}
                        aria-label="name"
                        placeholder="Digite o nome do Tutor"
                        required
                        disabledError
                        onChange={onlyWords}
                    />
                    <FieldPhone
                        label="Telefone/Celular"
                        name="contact_tutor.phone"
                        disabled={isPending || tutorExists}
                        placeholder={
                            isPending
                                ? "Carregando..."
                                : "Digite o seu Número de Telefone"
                        }
                        required
                    />
                    <AddressTutor disabled={tutorExists} />
                </div>
                <ControlSwitch
                    label="O pet possui um segundo Tutor?"
                >
                    <div className="left mb-2">Preencha as Informações do segundo Tutor</div>
                    <FieldDocument
                        label="CPF"
                        name="responsible_tutors.cpf_tutor"
                        aria-label="document"
                        disabled={isPending || tutorExists}
                        typeDocument="cpf"
                        placeholder="CPF"
                        required
                    />
                    <FieldControl
                        label="Nome Completo"
                        name="responsible_tutors.name_tutor"
                        disabled={isPending || tutorExists}
                        aria-label="name"
                        placeholder="Digite o nome do Tutor"
                        required
                        disabledError
                        onChange={onlyWords}
                    />

                </ControlSwitch>

            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
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

export default StepTutor;
