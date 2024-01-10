import { Form } from 'formik'
import * as Yup from 'yup'
import { BtnPrimary } from '~/Components/atoms/btn'
import BoxButtons from '~/Components/molecules/box-buttons'
import FieldControl from '~/Components/molecules/field-control'
import FieldPhone from '~/Components/molecules/field-phone'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import { CtxSimplifiedPedFields, StepProps } from '../../types'

export const validationSchema = Yup.object().shape({
    ownerEmergencyContact: Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        phone: Yup.string().required('Campo obrigatório'),
        email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    }),
})

const StepTutor = ({ previousStep, isLoading }: StepProps) => {
    const { isValid, handleSubmit, isSubmitting, values } =
        useFormikContextSafe<CtxSimplifiedPedFields>()

    return (
        <Form onSubmit={handleSubmit}>
            <div className="overflow-auto h-[calc(100vh-24rem)] flex flex-col w-full justify-center gap-2 px-2">
                <FieldControl
                    ctx={{} as CtxSimplifiedPedFields}
                    required
                    label="Nome do tutor"
                    name="ownerEmergencyContact.name"
                    placeholder="Nome"
                />

                <FieldPhone
                    ctx={{} as CtxSimplifiedPedFields}
                    required
                    label="Telefone do tutor"
                    name="ownerEmergencyContact.phone"
                    placeholder="Telefone"
                />

                <FieldControl
                    ctx={{} as CtxSimplifiedPedFields}
                    required
                    label="Email do tutor"
                    name="ownerEmergencyContact.email"
                    placeholder="Email"
                />
            </div>
            <BoxButtons
                isValid={isValid}
                link={false}
                isLoading={isSubmitting || isLoading}
                onClickCancel={previousStep}
                onClickSuccess={() => null}
                success={({ disabled }) => (
                    <BtnPrimary
                        isLoading={isSubmitting || isLoading}
                        label="Concluir"
                        type="submit"
                        disabled={disabled || isSubmitting || isLoading}
                    />
                )}
            />
        </Form>
    )
}

export default StepTutor
