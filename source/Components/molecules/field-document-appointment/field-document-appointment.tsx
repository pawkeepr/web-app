import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Form, Formik } from "formik";
import { startTransition } from "react";
import ModalListPets from "~/Components/modals/modal-list-pets/modal-list-pets";
import FieldDocument from "~/Components/molecules/field-document/field-document";
import isValidCPF from "~/validations/cpf";

type InitialValues = {
    document: string;
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

const FieldDocumentAppointment = ({
    selectedTabInitial = 1,
    children,
}: FieldDocumentAppointmentProps) => {
    const initialValues: InitialValues = { document: "" };

    const onHandleSubmit = ({
        onChangeDocument,
        onChangeOpen,
    }: HandleProps) => {
        return async (values: InitialValues) => {
            if (!isValidCPF(values.document) && selectedTabInitial === 1) {
                alert("CPF inválido! Por favor, insira um CPF válido.");
                return;
            }

            startTransition(() => {
                onChangeDocument(values.document);
                onChangeOpen(true);
            });
        };
    };


    return (
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
                    <Form className=" flex flex-row items-center justify-end ">
                        {
                            children?.({ onChangeOpen, onChangeDocument }) ||
                            <div className="w-full hidden lg:block xl:block   ">
                                <FieldDocument
                                    name="document"
                                    placeholder="Nova Consulta"
                                    label="CPF"
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
                </Formik>
            )}
        </ModalListPets>
    );
};

export default FieldDocumentAppointment;
