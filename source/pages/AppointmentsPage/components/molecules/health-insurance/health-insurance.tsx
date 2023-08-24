import FieldControl from "~/Components/molecules/field-control";
import ControlSwitch from "../switch";
import { Row } from "reactstrap";



export default function HealthInsurance() {
    return (

    <div className="text-align: left mb-4">
        <Row className="mt-2">
            <ControlSwitch
                label="O pet possui plano de saúde?"
                className="mt-2 mb-4 lg:w-16 lg:h-7 w-[3.72rem] h-6"
            >
            <div className="text-align: left mb-2">Preencha as Informações do plano de saúde do Pet</div>
                <div className="text-red-500 mt-2">Os campos abaixo são opcionais!</div>
                
                <div className="grid grid-cols-2 mobile:grid-cols-1 gap-3 m-2 p-2">
                    <FieldControl
                        label="Nome do plano"
                        name="health_insurance"
                        placeholder="Digite o nome do plano"
                    />
                    <FieldControl
                        label="Tipo do plano"
                        name="palno_type"
                        placeholder="Digite o tipo do plano"
                    />
                    <FieldControl
                        label="Número da carteirinha"
                        name="card_number"
                        placeholder="Digite o número da carteirinha"
                        type="field masked"
                    />
                    <FieldControl
                        label="Validade da carteirinha"
                        name="wallet_validity"
                        placeholder="Digite a data de validade da carteirinha"
                        type="date"
                    />
                </div>
            </ControlSwitch>
        </Row>
    </div>
    )
}