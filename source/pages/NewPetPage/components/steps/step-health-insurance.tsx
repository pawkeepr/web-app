import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control";
import { StepProps } from "~/types/helpers";


export default function StepHealthInsurance({ toggleTab, activeTab }: StepProps) {
    return (

        <div className="mb-4">

            <div className="flex justify-center mb-2">Preencha as Informações do plano de saúde do Pet</div>
            <span className="flex justify-center items-center text-secondary-500 font-semibold">Obrigatório(*)</span>
            <div className="grid grid-cols-2 mobile:grid-cols-1 gap-3 m-2 p-2">
                <FieldControl
                    label="Nome do plano"
                    required
                    name="health_insurance"
                    placeholder="Digite o nome do plano"
                />
                <FieldControl
                    label="Tipo do plano"
                    name="health_insurance.type_health"
                    placeholder="Digite o tipo do plano"
                />
                <FieldControl
                    label="Número da carteirinha"
                    name="health_insurance.number_health"
                    placeholder="Digite o número da carteirinha"

                />
                <FieldControl
                    label="Validade da carteirinha"
                    name="health_insurance.validity"
                    placeholder="Digite a data de validade da carteirinha"
                    type="date"
                />
            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
                <BtnPrimary
                    label="Cadastrar"
                    type="submit"
                />
            </div>
        </div>
    )
}