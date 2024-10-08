import { PlusIcon } from '@heroicons/react/24/solid'
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
                                className="flex flex-row items-center justify-end "
                                onSubmit={handleSubmit}
                            >
                                {children?.({
                                    onChangeOpen,
                                    onChangeDocument,
                                }) || (
                                    <div className="flex items-center">
                                        <FieldDocument
                                            ctx={values}
                                            name="cpf_tutor"
                                            placeholder="Agendar/Nova consulta"
                                            divClassName="!w-96 mobile:hidden"
                                            className={` ${styles['field-document']} text-xs`}
                                            onlyCPF
                                            required={false}
                                            label="CPF do tutor para"
                                        />
                                        <button
                                            type="submit"
                                            className="items-center justify-center hidden p-1 m-1 mt-2 transition duration-500 ease-in-out rounded-full shadow-2xl web:block bg-secondary-500 opacity-70 hover:opacity-100"
                                        >
                                            <PlusIcon className="w-4 h-4 text-white" />
                                        </button>
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
