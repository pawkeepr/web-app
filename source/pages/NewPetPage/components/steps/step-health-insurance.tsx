import { Form } from "formik";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";
import useFormikContextSafe from "~/hooks/use-formik-context-safe";
import { InitialValues } from "~/pages/NewPetPage";
import { StepProps } from "~/types/helpers";

type StepHealthInsuranceKeys = Pick<InitialValues, 'health_insurance'>;

export default function StepHealthInsurance({ toggleTab, activeTab }: StepProps) {
    const { handleSubmit, isSubmitting } = useFormikContextSafe<StepHealthInsuranceKeys>()

    return (
        <Form className="mb-4" onSubmit={handleSubmit}>
            <div className="flex justify-center mb-2">Preencha as Informações do plano de saúde do Pet</div>
            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-3 m-2 p-2">
                <FieldControl
                    ctx={{} as StepHealthInsuranceKeys}
                    label="Nome do plano"
                    name="health_insurance.name"
                    placeholder="Digite o nome do plano"
                />
                <FieldControl
                    ctx={{} as StepHealthInsuranceKeys}
                    label="Tipo do plano"
                    name="health_insurance.type_health"
                    placeholder="Digite o tipo do plano"
                />
                <FieldControl
                    ctx={{} as StepHealthInsuranceKeys}
                    label="Número da carteirinha"
                    name="health_insurance.number_health"
                    placeholder="Digite o número da carteirinha"

                />
                <FieldControl
                    ctx={{} as StepHealthInsuranceKeys}
                    label="Validade da carteirinha"
                    name="health_insurance.validity"
                    placeholder="Digite a data de validade da carteirinha"
                    type="date"
                />
            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnCancel
                    condition={!isSubmitting}
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
                <BtnPrimary
                    isLoading={isSubmitting}
                    label="Cadastrar"
                    type="submit"
                />
            </div>
        </Form>
    )
}