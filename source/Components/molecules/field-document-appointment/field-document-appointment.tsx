import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Form, Formik } from "formik";
import { startTransition, useState } from "react";
import ModalListPets from "~/Components/modals/list-pets-modal/modal-list-pets";
import ModalWarning from "~/Components/modals/warning-modal/modal-warning";
import FieldDocument from "~/Components/molecules/field-document/field-document";
import isValidCPF from "~/validations/cpf";

type InitialValues = {
    cpf_tutor: string;
};

type onChangeOpen = (arg: boolean) => void;

type HandleProps = {
    onChangeOpen: onChangeOpen;
    onChangeDocument: (doc: string) => void;
};

type FieldDocumentAppointmentProps = {
    selectedTabInitial?: number;
    children?: (props: HandleProps) => JSX.Element;
}

const initialValues: InitialValues = { cpf_tutor: "" };

const FieldDocumentAppointment = ({
    selectedTabInitial = 1,
    children,
}: FieldDocumentAppointmentProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onHandleSubmit = ({
        onChangeDocument,
        onChangeOpen,
    }: HandleProps) => {
        return async (values: InitialValues) => {
            if (!isValidCPF(values.cpf_tutor) && selectedTabInitial === 1) {
                setIsOpen(true);
                return;
            }

            startTransition(() => {
                onChangeDocument(values.cpf_tutor);
                onChangeOpen(true);
            });
        };
    };


    return (
        <>
            <ModalWarning
                title='CPF INVÁLIDO'
                description='Por favor, cadastrar um CPF válido para prosseguir.'
                isOpen={isOpen}
                closeModal={() => { setIsOpen(false) }}
            />
            <ModalListPets selectedTabInitial={selectedTabInitial}>

                {({ onChangeOpen, onChangeDocument }) => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onHandleSubmit({
                            onChangeDocument,
                            onChangeOpen,
                        })}
                        enableReinitialize
                    >
                        {
                            ({ handleSubmit }) => (
                                <Form className=" flex flex-row items-center justify-end" onSubmit={handleSubmit}>
                                    {
                                        children?.({ onChangeOpen, onChangeDocument }) ||
                                        <div className="w-full mb-3 ml-3 hidden lg:block xl:block">
                                            <FieldDocument
                                                name="cpf_tutor"
                                                placeholder="Nova Consulta"
                                                label="CPF"
                                                className="rounded-md"
                                                onlyCPF
                                                endIcon={
                                                    <button
                                                        className="focus:outline-none flex h-full items-center justify-center"
                                                        data-bs-target="#addVeterinaryAppointmentModal"
                                                        type="submit"
                                                    >
                                                        <PlusCircleIcon className="h-6 w-6 self-center m-2 text-secondary-500" />
                                                    </button>
                                                }
                                            />
                                        </div>
                                    }
                                </Form>
                            )
                        }

                    </Formik>
                )}
            </ModalListPets>
        </>
    );
};

export default FieldDocumentAppointment;
