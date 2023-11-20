import { Form, useFormikContext } from 'formik'
import { BtnPrimary } from '~/Components/atoms/btn'
import BoxButtons from '~/Components/molecules/box-buttons'
import FieldControl from '~/Components/molecules/field-control'
import FieldPhone from '~/Components/molecules/field-phone'
import { InitialValues, StepProps } from '../../types'


const StepTutor = ({
    previousStep,
    isLoading,
}: StepProps) => {

    const { isValid, handleSubmit, isSubmitting } = useFormikContext<InitialValues>()


    return (
        <Form onSubmit={handleSubmit}>
            <div className="overflow-auto h-[calc(100vh-24rem)] flex flex-col w-full justify-center gap-2 px-2">
                <FieldControl
                    required
                    label="Nome do tutor"
                    name="ownerEmergencyContact.name"
                    placeholder="Nome"
                />

                <FieldPhone
                    required
                    label="Telefone do tutor"
                    name="ownerEmergencyContact.phone"
                    placeholder="Telefone"
                />

                <FieldControl
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
                success={({ disabled }) => <BtnPrimary
                    isLoading={isSubmitting || isLoading}
                    label="Concluir"
                    type="submit"
                    disabled={disabled || isSubmitting}
                />}
            />
        </Form>
    )
}

export default StepTutor