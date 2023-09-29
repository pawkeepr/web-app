import { useFormikContext } from "formik";
import { useState } from "react";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control/field-control";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldTextArea from "~/Components/molecules/field-text-area/field-text-area";
import { InitialValues } from "~/pages/AppointmentsPage/Appointments";
import Nutritions from "../../molecules/nutritions";
import ControlSwitch from "../../molecules/switch/switch";
import { StepProps } from "./types";

const StepInfo = ({ toggleTab, activeTab }: StepProps) => {
    const physical_activity = ['Caminhadas', 'Corridas', 'Natação', 'Passeios', 'Cabo-de-guerra', 'Varetinhas', 'Bolinhas']
    const measurements = ['Kilogramas', 'Gramas']
    const { values, setFieldValue, errors } = useFormikContext<InitialValues>();
    const [heightPet, setHeightPet] = useState(0);
    const [weighthPet, setweighthPet] = useState(0);

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
    function calcularIMC(heigth: number, weight: number): number {
        if (heigth === 0 || weight === 0) {
            return 0; // Evita divisão por zero
        }
        const imc = weight / ((heigth / 100) * (heigth / 100)); // Converter altura para metros
        return imc;
    }

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
                    <FieldControl
                        label="Idade"
                        placeholder="Idade do pet em meses ou anos"
                        className=""
                        name="age"
                        required
                        type="number" />
                    <FieldControl
                        label="Peso"
                        placeholder="Peso do pet em quilos ou gramas, exemplo = 4"
                        className=""
                        required
                        onChange={(e: any) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); setweighthPet(e.target.value) }}
                        name="weight"
                        type="number" />
                    <div className="flex flex-col mb-[6px] w-full">
                        {/* <span className=" text-xs">Medida:</span> */}
                        <FieldControlSelect
                            label="Selecione uma medida"
                            placeholder="Selecione uma medida"
                            name="measurements"
                            options={options2}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row tems-center mt-2 mb-2 gap-2">
                    <FieldControl
                        label="Altura"
                        placeholder="Altura do pet em centímetros, exemplo = 32"
                        className="border-gray-300"
                        onChange={(e: any) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); setHeightPet(e.target.value) }}
                        name="height"
                        type="number" />
                    <FieldControl
                        label="Comprimento"
                        placeholder="Comprimento do pet em centímetros "
                        className="border-gray-300"
                        name="length"
                        type="number" />
                </div>
                <div>
                    {weighthPet > 0 && heightPet > 0 && (
                        <h2 className="m-4 font-bold">
                            O IMC do animal é: {calcularIMC(heightPet, weighthPet).toFixed(2)}
                        </h2>
                    )}
                </div>

                <div className="flex flex-col mt-2">
                    <FieldTextArea
                        label="Orientações e Anotações"
                        className="rounded-md w-full border-gray-300"
                        component="textarea"
                        name="observations"
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
                    link
                    type="button"
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
                <BtnPrimary
                    type="button"
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