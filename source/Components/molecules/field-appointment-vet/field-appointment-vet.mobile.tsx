import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Form, Formik } from 'formik'
import { startTransition, useState } from 'react'
import withControl from '~/Components/helpers/with-control'
import ModalScheduledV2 from '~/Components/modals/scheduled-v2-modal'
import ModalWarning from '~/Components/modals/warning-modal/modal-warning'
import FieldDocument from '~/Components/molecules/field-document/field-document'
import isValidCPF from '~/validations/cpf'
import styles from './field-document.module.scss'

type InitialValues = {
    cpf_tutor: string
}

type onChangeOpen = (arg: boolean) => void

type HandleProps = {
    onChangeOpen: onChangeOpen
    onChangeDocument: (doc: string) => void
}

type FieldDocumentAppointmentProps = {
    selectedTabInitial?: number
    children?: (props: HandleProps) => JSX.Element
}

const initialValues: InitialValues = { cpf_tutor: '' }

const FieldDocumentAppointment = ({
    selectedTabInitial = 1,
    children,
}: FieldDocumentAppointmentProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const onHandleSubmit = ({ onChangeDocument, onChangeOpen }: HandleProps) => {
        return async (values: InitialValues) => {
            if (!isValidCPF(values.cpf_tutor) && selectedTabInitial === 1) {
                setIsOpen(true)
                return
            }

            startTransition(() => {
                onChangeDocument(values.cpf_tutor)
                onChangeOpen(true)
            })
        }
    }

    return (
        <>
            <ModalWarning
                title="CPF INVÁLIDO"
                description="Por favor, cadastrar um CPF válido para prosseguir."
                isOpen={isOpen}
                closeModal={() => {
                    setIsOpen(false)
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
                                                fixed flex flex-col items-center 
                                                justify-center opacity-100 z-50 
                                                mobile:bottom-20 web:bottom-14 right-2
                                                w-[95vw] pt-4 web:hidden
                                                transition-all duration-300
                                                ${styles['field-document']}
                                    `   }
                                        >
                                            <span className="text-xs text-gray-500 font-semibold font-sans w-full absolute top-0 right-0 mobile:text-center">
                                                {
                                                    'Insira o CPF do tutor para agendar ou iniciar uma consulta'
                                                }
                                            </span>
                                            <FieldDocument
                                                ctx={values}
                                                name="cpf_tutor"
                                                placeholder="Agendar/Nova Consulta"
                                                onlyCPF
                                                endIcon={
                                                    <button
                                                        className="focus:outline-none flex h-full items-center justify-center"
                                                        data-bs-target="#addVeterinaryAppointmentModal"
                                                        type="submit"
                                                    >
                                                        <PlusCircleIcon className="h-6 w-6 m-2 text-secondary-500" />
                                                    </button>
                                                }
                                            />
                                        </div>
                                    )}
                            </Form>
                        )}
                    </Formik>
                )}
            </ModalScheduledV2>
        </>
    )
}

export default withControl(FieldDocumentAppointment)
