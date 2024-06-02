import { Form } from 'formik'
import * as Yup from 'yup'
import { BtnPrimary } from '~/Components/atoms/btn'
import BoxButtons from '~/Components/molecules/box-buttons'
import FieldControl from '~/Components/molecules/field-control'
import FieldPhone from '~/Components/molecules/field-phone'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { CtxSimplifiedPeTFields, StepProps } from '../../types'

export const validationSchema = Yup.object().shape({
    ownerEmergencyContact: Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        phone: Yup.string().required('Campo obrigatório'),
        email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    }),
})

const StepTutor = ({ previousStep, isLoading }: StepProps) => {
    const { isValid, handleSubmit, isSubmitting, values, initialValues } =
        useFormikContextSafe<CtxSimplifiedPeTFields>()

    return (
        <Form
            className="flex-1 flex mobile:h-[90vh] web:h-full  w-full  justify-between items-center flex-col"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center justify-center flex-1 w-full gap-2 py-1 overflow-auto">
                <div className="grid w-full grid-cols-3 gap-2 mobile:gap-0 mobile:grid-cols-1">
                    <FieldControl
                        ctx={values}
                        required
                        disabled={!!initialValues.ownerEmergencyContact?.first_name}
                        label="Nome do tutor"
                        name="ownerEmergencyContact.first_name"
                        placeholder="Nome"
                        divClassName="col-span-1 mobile:col-span-full"
                    />
                    <FieldControl
                        ctx={values}
                        disabled={!!initialValues.ownerEmergencyContact?.last_name}
                        required
                        label="Sobrenome do tutor"
                        name="ownerEmergencyContact.last_name"
                        placeholder="Sobrenome"
                        divClassName="col-span-2 mobile:col-span-full"
                    />
                </div>

                <FieldPhone
                    ctx={values}
                    required
                    label="Telefone do tutor"
                    name="ownerEmergencyContact.phone"
                    placeholder="Telefone"
                />

                <FieldControl
                    ctx={values}
                    disabled={!!initialValues.ownerEmergencyContact?.email}
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
                        label="Cadastrar Pet"
                        type="submit"
                        onClick={() => {
                            if (isValid) {
                                handleSubmit()
                            }
                        }}
                        disabled={disabled || isSubmitting || isLoading}
                    />
                )}
            />
        </Form>
    )
}

export default StepTutor
