import FieldDocument from '~/Components/molecules/field-document/field-document'
import FieldPhone from '~/Components/molecules/field-phone/field-phone'

import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'

import FieldControl from '~/Components/molecules/field-control/field-control'

import { StepProps } from '~/types/helpers'
import { InitialValues } from '../../index'
import AddressTutor from '../molecules/address-tutor.tsx'

import { useMemo } from 'react'
import * as yup from 'yup'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'

type StepTutorsKeys = Pick<InitialValues, 'ownerEmergencyContact' | 'cpf_tutor'>

const schema = yup.object().shape({
    cpf_tutor: yup.string().required('Campo obrigatório'),
    ownerEmergencyContact: yup
        .object()
        .shape({
            name: yup.string().min(2).max(255).required('Campo obrigatório'),
            phone: yup.string().length(20).required('Campo obrigatório'),
            email: yup.string().email().required('Campo obrigatório'),
            address: yup.object().shape({
                zipCode: yup.string().required('Campo obrigatório'),
                state: yup.string().required('Campo obrigatório'),
                city: yup.string().required('Campo obrigatório'),
                street: yup.string().required('Campo obrigatório'),
            }),
        })
        .required('Campo obrigatório'),
})

const StepTutor = ({ toggleTab, activeTab, isPending, tutorExist }: StepProps) => {
    const { values } = useFormikContextSafe<StepTutorsKeys>()

    const isValid = useMemo(() => {
        return schema.isValidSync(values)
    }, [values])

    return (
        <div className="card card-body shadow-lg">
            <div className="p-1 m-2 mb-4">
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Informações do Tutor
                    <br />

                    <span className="text-sm font-bold text-secondary-500">
                        Obrigatório (*)
                    </span>
                </h4>
            </div>
            <div className="flex flex-col flex-1 gap-2">
                <div className="mb-2">Preencha as Informações do Tutor</div>
                <div className="grid grid-cols-3 mobile:grid-cols-1 gap-2">
                    <FieldDocument
                        ctx={{} as StepTutorsKeys}
                        label="CPF"
                        name="cpf_tutor"
                        disabled={isPending || tutorExist}
                        aria-label="document"
                        typeDocument="cpf"
                        placeholder="CPF"
                        required
                    />
                    <FieldControl
                        initialFocus
                        ctx={{} as StepTutorsKeys}
                        label="Nome Completo"
                        name="ownerEmergencyContact.name"
                        disabled={isPending || tutorExist}
                        aria-label="name"
                        placeholder="Digite o nome do Tutor"
                        required
                        disabledError
                    />
                    <FieldPhone
                        label="Telefone/Celular"
                        name="ownerEmergencyContact.phone"
                        disabled={isPending || tutorExist}
                        placeholder={
                            isPending
                                ? 'Carregando...'
                                : 'Digite o seu Número de Telefone'
                        }
                        required
                    />
                    <FieldControl
                        initialFocus
                        label="Email"
                        name="ownerEmergencyContact.email"
                        aria-label="email"
                        disabled={isPending || tutorExist}
                        className=" "
                        placeholder="Digite o email do tutor"
                        required
                        disabledError
                    />
                    <AddressTutor disabled={tutorExist} />
                </div>
                {/* <ControlSwitchDiv
                    name="has_second_tutor"
                    label="O pet possui um segundo Tutor?"
                    onClick={() => setSecondTutorActive(!secondTutorActive)}
                >
                    <div className="left mb-2">Preencha as Informações do segundo Tutor</div>
                    <FieldDocument
                        label="CPF"
                        name="responsible_tutors.cpf_tutor"
                        aria-label="document"
                        disabled={isPending}
                        typeDocument="cpf"
                        placeholder="CPF"
                        required
                    />
                    <FieldControl
                        label="Nome Completo"
                        name="responsible_tutors.name_tutor"
                        disabled={isPending}
                        aria-label="name"
                        placeholder="Digite o nome do Tutor"
                        required
                        disabledError
                    />

                </ControlSwitchDiv> */}
            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1)
                    }}
                />
                <BtnPrimary
                    disabled={!isValid}
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1)
                    }}
                />
            </div>
        </div>
    )
}

export default StepTutor
