import { useState } from "react";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import ControlSwitch from "~/Components/molecules/control-switch-div/switch";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldNumber from "~/Components/molecules/field-number";
import FieldTextArea from "~/Components/molecules/field-text-area/field-text-area";
import Nutritions from "../../molecules/nutritions";
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
        <>
            <div>
                <h4 className="text-center">Informações bem-estar do pet
                    <br />
                    <span className="text-sm font-bold text-secondary-500">Obrigatório (*)</span>
                </h4>
            </div>
            <div className="flex flex-col mt-4 w-full">
                <div className="flex md:flex-row flex-col mt-2 mb-2 gap-2">
                    <FieldNumber
                        label="Idade"
                        placeholder="Idade do pet em meses ou anos"
                        name="age"
                        required
                        type="number" />
                    <FieldNumber
                        label="Peso"
                        placeholder="Peso do pet em quilos ou gramas, exemplo = 4"
                        required
                        onChange={(e: any) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); setWeightPet(e.target.value) }}
                        name="weight"
                        type="number" />
                    <div className="flex flex-col mb-[6px] w-full">
                        <FieldControlSelect
                            label="Selecione uma medida"
                            placeholder="Selecione uma medida"
                            name="type_weigth"
                            options={options2}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row tems-center mt-2 mb-2 gap-2">
                    <FieldNumber
                        label="Altura"
                        placeholder="Altura do pet em centímetros, exemplo = 32"
                        onChange={(e: any) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); setHeightPet(e.target.value) }}
                        name="height"
                        type="number" />
                    <FieldNumber
                        label="Comprimento"
                        placeholder="Comprimento do pet em centímetros "
                        className="border-gray-300"
                        name="length"
                        type="number" />
                </div>
                <div>
                    {weightPet > 0 && heightPet > 0 && (
                        <h2
                            className="m-4 font-bold"
                        >
                            O IMC do animal é: {calcularIMC(heightPet, weightPet).toFixed(2)}
                        </h2>
                    )}
                </div>

                <div className="flex flex-col mt-2">
                    <FieldTextArea
                        label="Orientações e Anotações"
                        className="rounded-md w-full border-gray-300"
                        component="textarea"
                        name="guidelines_notes"
                        type="text" />
                </div>
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