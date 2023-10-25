/* eslint-disable react/jsx-no-undef */
import Row from "react-bootstrap/Row";

import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldNumber from "~/Components/molecules/field-number";
import FieldTextArea from "~/Components/molecules/field-text-area/field-text-area";

import { useState } from "react";

import ComboBoxFields from "~/Components/modals/add-pet-modal/components/organisms/combo-box-fields";
import { StepProps } from "~/types/helpers";

const measurements = ['Quilogramas', 'Gramas']

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
        <div className="card card-body shadow-lg">
            <div className="p-1 m-2 mb-4">
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Informações do PET
                    <br />

                    <span className="text-sm font-bold text-secondary-500">Obrigatório (*)</span>
                </h4>
            </div>
            <div className="text-align: left mb-4">Preencha as Informações do PET</div>
            <div>
                <Row className="g-3">

                    <ComboBoxFields name="pet_data" />

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
                                    name="type_weight"
                                    options={options2}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row tems-center mt-2 mb-2 gap-2">
                            <FieldNumber
                                label="Altura"
                                placeholder="Altura do pet em centímetros, exemplo = 32"
                                onChange={(e: any) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                    setHeightPet(e.target.value)
                                }}
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
                </Row>

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
    );
};

export default StepPet;
