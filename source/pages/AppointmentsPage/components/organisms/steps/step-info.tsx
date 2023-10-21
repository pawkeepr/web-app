import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import ControlSwitch from "~/Components/molecules/control-switch-div/switch";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import { StepProps } from "~/types/helpers";
import Nutritions from "../../molecules/nutritions";

const physical_activity = ['Caminhadas', 'Corridas', 'Natação', 'Passeios', 'Cabo-de-guerra', 'Varetinhas', 'Bolinhas']
const measurements = ['Kilogramas', 'Gramas']

const options = physical_activity.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
}));


const StepInfo = ({ toggleTab, activeTab }: StepProps) => {

    return (
        <>
            <div>
                <h4 className="text-center">Informações bem-estar do pet
                    <br />
                    <span className="text-sm font-bold text-secondary-500">Obrigatório (*)</span>
                </h4>
            </div>

            <div className="mt-2">
                <ControlSwitch
                    label="O pet está praticando atividade física ?"
                    className="mt-3 w-[3.72rem] h-6 lg:w-16 lg:h-7"
                >
                    <FieldControlSelect
                        label="Selecione uma ou mais opções:"
                        placeholder="Selecione uma ou mais atividades"
                        isMulti
                        name="activities_carry"
                        options={options}
                    />
                </ControlSwitch>
                <ControlSwitch
                    label="Aplicar nutrição alimentar?"
                    className="mt-2 w-[3.72rem] h-6 lg:w-16 lg:h-7"
                >
                    <Nutritions />
                </ControlSwitch>
            </div>

            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
                <BtnPrimary
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                />
            </div>
        </>
    )
}

export default StepInfo