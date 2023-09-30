import { useState } from "react";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldNumber from "~/Components/molecules/field-number";
import FieldTextArea from "~/Components/molecules/field-text-area/field-text-area";
import Nutritions from "../../molecules/nutritions";
import ControlSwitch from "../../molecules/switch/switch";
import { StepProps } from "./types";

const physical_activity = ['Caminhadas', 'Corridas', 'Natação', 'Passeios', 'Cabo-de-guerra', 'Varetinhas', 'Bolinhas']
const measurements = ['Kilogramas', 'Gramas']

const options = physical_activity.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
}));

const options2 = measurements.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
}));

// Função para calcular o IMC de um animal
function calcularIMC(height: number, weight: number): number {
    if (height === 0 || weight === 0) {
        return 0; // Evita divisão por zero
    }
    const imc = weight / ((height / 100) * (height / 100)); // Converter altura para metros
    return imc;
}

const StepInfo = ({ toggleTab, activeTab }: StepProps) => {
    const [heightPet, setHeightPet] = useState(0);
    const [weightPet, setWeightPet] = useState(0);

    return (
        <div className="card card-body shadow-lg">
            <div>
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Informações bem-estar do pet
                    <br />
                    <span className="text-xs font-bold text-secondary-500">Obrigatório (*)</span>
                </h4>
            </div>
            <div className="grid grid-cols-3 gap-1 mobile:grid-cols-1">
                <FieldNumber
                    label="Idade"
                    placeholder="Idade do pet em meses ou anos"
                    name="age"
                    required
                />
                <div className="col-span-2 grid grid-cols-2 gap-1">
                    <FieldNumber
                        label="Peso"
                        placeholder="Peso do pet em quilos ou gramas, exemplo = 4"
                        required
                        name="weight"
                    />

                    <FieldControlSelect
                        label="Selecione uma medida"
                        placeholder="Selecione uma medida"
                        name="measurements"
                        options={options2}
                    />
                </div>

                <FieldNumber
                    label="Altura"
                    placeholder="Altura do pet em centímetros, exemplo = 32"
                    onChange={(e: any) => {
                        const height = e.target.value.replace(/[^0-9]/g, '');
                        setHeightPet(height)
                    }}
                    name="height"

                />
                <FieldNumber
                    label="Comprimento"
                    onChange={(e: any) => {
                        const weight = e.target.value.replace(/[^0-9]/g, '');
                        setWeightPet(weight)
                    }}
                    placeholder="Comprimento do pet em centímetros "
                    name="length"
                />
                <div>
                    {weightPet > 0 && heightPet > 0 && (
                        <h2 className="m-4 font-bold">
                            O IMC do animal é: {calcularIMC(heightPet, weightPet).toFixed(2)}
                        </h2>
                    )}
                </div>

                <FieldTextArea
                    div={
                        {
                            className: 'col-span-full'
                        }
                    }
                    label="Orientações e Anotações"
                    name="observations"
                />
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
                        name="activity"
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
        </div>
    )
}

export default StepInfo