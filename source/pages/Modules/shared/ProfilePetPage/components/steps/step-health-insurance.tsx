import { Form } from 'formik'
import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'
import FieldControl from '~/Components/molecules/field-control'
import useFormikContextSafe from '~/hooks/use-formik-context-safe'
import type { InitialValues } from '~/pages/NewPetPage'
import type { StepProps, Tabs } from '~/types/helpers'
import { useModeEditablePet } from '../hooks/use-mode-editable-pet'

type StepHealthInsuranceKeys = Pick<InitialValues, 'health_insurance' | 'id'>

export default function StepHealthInsurance({
    toggleTab,
    activeTab,
    isPending,
}: StepProps) {
    const { mode } = useModeEditablePet()
    const { handleSubmit, values, isSubmitting } =
        useFormikContextSafe<StepHealthInsuranceKeys>()

    return (
        <Form
            className="flex relative flex-col card-body shadow-lg mobile:p-0"
            onSubmit={handleSubmit}
        >
            <div className="flex justify-center mb-2">
                Preencha as Informações do plano de saúde do Pet
            </div>
            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-3 m-2 p-2">
                <FieldControl
                    mode={mode}
                    ctx={values}
                    label="Nome do plano"
                    name="health_insurance.name"
                    placeholder="Digite o nome do plano"
                />
                <FieldControl
                    mode={mode}
                    ctx={values}
                    label="Tipo do plano"
                    name="health_insurance.type_health"
                    placeholder="Digite o tipo do plano"
                />
                <FieldControl
                    mode={mode}
                    ctx={values}
                    label="Número da carteirinha"
                    name="health_insurance.number_health"
                    placeholder="Digite o número da carteirinha"
                />
                <FieldControl
                    mode={mode}
                    ctx={values}
                    label="Validade da carteirinha"
                    name="health_insurance.validity"
                    placeholder="Digite a data de validade da carteirinha"
                    type="date"
                />
            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnCancel
                    condition={!isPending && !isSubmitting && mode === 'editable'}
                    label="Voltar"
                    onClick={() => {
                        toggleTab((activeTab - 1) as Tabs)
                    }}
                />
                <BtnPrimary
                    condition={mode === 'editable'}
                    disabled={isSubmitting || mode !== 'editable'}
                    isLoading={isSubmitting}
                    label={values.id ? 'Atualizar' : 'Cadastrar'}
                    type="submit"
                />
            </div>
        </Form>
    )
}