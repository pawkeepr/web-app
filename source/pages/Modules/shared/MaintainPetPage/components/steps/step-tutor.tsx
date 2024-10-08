import FieldDocument from '~/Components/molecules/field-document/field-document'
import FieldPhone from '~/Components/molecules/field-phone/field-phone'

import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'

import FieldControl from '~/Components/molecules/field-control/field-control'

import type { RecordsShapeYup, StepProps } from '~/types/helpers'
import type { InitialValues } from '../../index'
import AddressTutor from '../molecules/address-tutor'

import * as yup from 'yup'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { useModeEditablePet } from '../hooks/use-mode-editable-pet'

type StepTutorsKeys = Pick<
    InitialValues,
    'ownerEmergencyContact' | 'cpf_cnpj' | 'id'
>

type StepTutorSchema = RecordsShapeYup<StepTutorsKeys>

const schema = yup.object().shape<StepTutorSchema>({
    cpf_cnpj: yup.string().required('Campo obrigatório'),
    ownerEmergencyContact: yup
        .object()
        .shape({
            first_name: yup.string().min(2).max(255).required('Campo obrigatório'),
            last_name: yup.string().min(2).max(255).required('Campo obrigatório'),
            phone: yup.string().length(20).required('Campo obrigatório'),
            email: yup.string().email().required('Campo obrigatório'),
            address: yup.object().shape({
                zipCode: yup.string().required('Campo obrigatório'),
                state: yup.string().required('Campo obrigatório'),
                city: yup.string().required('Campo obrigatório'),
                street: yup.string().required('Campo obrigatório'),
                neighborhood: yup.string().required('Campo obrigatório'),
                number: yup.string().optional(),
                complement: yup.string().optional(),
            }),
        })
        .required('Campo obrigatório'),
})

const StepTutor = ({ prevStep, isPending, tutorExist }: StepProps) => {
    const { values, isSubmitting, isValid } = useFormikContextSafe<StepTutorsKeys>()
    const { mode } = useModeEditablePet()

    return (
        <div className="relative flex flex-col shadow-lg card-body mobile:p-0">
            <div className="p-1 m-2 mb-4">
                <h4 className="font-sans text-base font-semibold text-center capitalize">
                    Informações do Tutor
                    <br />
                    <span className="text-sm font-bold text-secondary-500">
                        Obrigatório (*)
                    </span>
                </h4>
            </div>
            <div className="flex flex-col flex-1 gap-2">
                <div className="mb-2">Preencha as Informações do Tutor</div>
                <div className="grid grid-cols-2 gap-2 mobile:grid-cols-1">
                    <FieldControl
                        mode={mode}
                        ctx={values}
                        required
                        disabled={isPending || tutorExist}
                        aria-label="first_name"
                        label="Nome do tutor"
                        name="ownerEmergencyContact.first_name"
                        placeholder="Nome"
                        disabledError
                    />
                    <FieldControl
                        mode={mode}
                        ctx={values}
                        required
                        disabled={isPending || tutorExist}
                        aria-label="last_name"
                        label="Sobrenome do tutor"
                        name="ownerEmergencyContact.last_name"
                        placeholder="Nome"
                        disabledError
                    />
                </div>
                <div className="grid grid-cols-3 gap-2 mobile:grid-cols-1">
                    <FieldDocument
                        mode={mode}
                        ctx={values}
                        label="CPF"
                        name="cpf_cnpj"
                        disabled={isPending || tutorExist}
                        aria-label="document"
                        typeDocument="cpf"
                        placeholder="CPF"
                        required
                    />

                    <FieldPhone
                        ctx={values}
                        mode={mode}
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
                        mode={mode}
                        ctx={values}
                        initialFocus
                        label="Email"
                        name="ownerEmergencyContact.email"
                        aria-label="email"
                        disabled={isPending || tutorExist}
                        className=""
                        placeholder="Digite o email do tutor"
                        required
                        disabledError
                    />
                    <AddressTutor disabled={tutorExist} mode={mode} />
                </div>
            </div>
            <div className="flex justify-center gap-3 mt-4 align-items-center">
                <BtnCancel
                    condition={!isPending && !isSubmitting && mode === 'editable'}
                    label="Voltar"
                    onClick={prevStep}
                />
                <BtnPrimary
                    condition={mode === 'editable'}
                    disabled={isSubmitting || mode !== 'editable' || !isValid}
                    isLoading={isSubmitting}
                    label={values.id ? 'Atualizar' : 'Cadastrar'}
                    type="submit"
                />
            </div>
        </div>
    )
}

export default StepTutor
