/* eslint-disable react/jsx-no-undef */
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";

import { useState } from "react";
import { BtnPrimary } from "~/Components/atoms/btn";
import ControlSwitchDiv from "~/Components/molecules/control-switch-div";
import FieldNumber from "~/Components/molecules/field-number";
import FieldTextArea from "~/Components/molecules/field-text-area/field-text-area";
import { StepProps } from "~/types/helpers";
import CardPet from "../../molecules/card-pet";

const physical_activity = ['Caminhadas', 'Corridas', 'Natação', 'Passeios', 'Cabo-de-guerra', 'Varetinhas', 'Bolinhas']
const measurements = ['Quilogramas', 'Gramas']

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


const StepPet = ({ toggleTab, activeTab }: StepProps) => {
    const [heightPet, setHeightPet] = useState(0);
    const [weightPet, setWeightPet] = useState(0);

    return (
        <section className="card card-body shadow-lg">
            <div>
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Bem Estar
                    <br />
                    <span className="text-xs font-bold text-secondary-500">Obrigatório (*)</span>
                </h4>
            </div>

            <CardPet />

            <ControlSwitchDiv
                label="O pet está praticando atividade física ?"
            >
                <FieldControlSelect
                    label="Selecione uma ou mais opções:"
                    placeholder="Selecione uma ou mais atividades"
                    isMulti
                    name="activities_carry"
                    options={options}
                />
            </ControlSwitchDiv>
            <div className="grid grid-cols-3 gap-3">

                <FieldNumber
                    label="Peso"
                    placeholder="Peso do pet em quilos, exemplo = 0.5 (500 gramas)"
                    required
                    onChange={(e: any) => { setWeightPet(e.target.value) }}
                    name="weight"
                    type="number"
                />

                <FieldNumber
                    label="Altura"
                    placeholder="Altura do pet em centímetros, exemplo = 32"
                    onChange={(e: any) => { setHeightPet(e.target.value) }}
                    name="height"
                    type="number" />
                <FieldNumber
                    label="Comprimento"
                    placeholder="Comprimento do pet em centímetros "
                    className="border-gray-300"
                    name="length"
                    type="number" />
                <div>
                    {weightPet > 0 && heightPet > 0 && (
                        <h2
                            className="m-4 font-bold"
                        >
                            O IMC do animal é: {calcularIMC(heightPet, weightPet).toFixed(2)}
                        </h2>
                    )}
                </div>

                <FieldTextArea
                    label="Orientações e Anotações"
                    div={{ className: "col-span-full" }}
                    className="rounded-md w-full border-gray-300"
                    component="textarea"
                    name="guidelines_notes"
                />
            </div>


            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnPrimary
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                />
            </div>
        </section>
    );
};

export default StepPet;