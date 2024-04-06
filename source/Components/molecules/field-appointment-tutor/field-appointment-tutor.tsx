import { Form, Formik } from "formik";
import { startTransition, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BtnPrimary } from "~/Components/atoms/btn";
import withControl from "~/Components/helpers/with-control";
import ModalScheduledV2 from "~/Components/modals/scheduled-v2-modal";
import ModalWarning from "~/Components/modals/warning-modal/modal-warning";
import isValidCPF from "~/validations/cpf";
import styles from "./field-document.module.scss";

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
};

const initialValues: InitialValues = { cpf_tutor: "" };

const FieldAppointmentTutor = ({
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
                title="CPF INVÁLIDO"
                description="Por favor, cadastrar um CPF válido para prosseguir."
                isOpen={isOpen}
                closeModal={() => {
                    setIsOpen(false);
                }}
            />
            <ModalScheduledV2 selectedTabInitial={selectedTabInitial}>
                {({ onChangeOpen, onChangeDocument }) => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onHandleSubmit({
                            onChangeDocument,
                            onChangeOpen,
                        })}
                        enableReinitialize
                    >
                        {({ handleSubmit, values }) => (
                            <Form
                                className=" flex flex-row items-center justify-end"
                                onSubmit={handleSubmit}
                            >
                                {children?.({
                                    onChangeOpen,
                                    onChangeDocument,
                                }) || (
                                        <div
                                            className={`
                                    w-96 ml-3 mobile:hidden block relative pt-3
                                    ${styles["field-document"]}
                                    `}
                                        >
                                            <BtnPrimary
                                                type="submit"
                                                label="Buscar Veterinário"
                                                className="w-full h-11 mb-4"
                                            >
                                                <FaSearch className="w-8 h-8 ml-1" />
                                            </BtnPrimary>
                                        </div>
                                    )}
                            </Form>
                        )}
                    </Formik>
                )}
            </ModalScheduledV2>
        </>
    );
};



export default withControl(FieldAppointmentTutor);;
