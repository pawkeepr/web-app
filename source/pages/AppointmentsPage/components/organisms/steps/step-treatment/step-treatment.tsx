
//Import images

import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";

import ControlSwitchDiv from "~/Components/molecules/control-switch-div";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldTextArea from "~/Components/molecules/field-text-area";
import { StepProps } from "~/types/helpers";
import Diseases from "../../../molecules/diseases";
import Exams from "../../../molecules/exams";
import Medicines from "../../../molecules/medicines";
import Nutritions from "../../../molecules/nutritions";
import Vaccines from "../../../molecules/vaccines";

const StepTreatment = ({ toggleTab, activeTab }: StepProps) => {
    const tests = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5']

    const options = tests.map((item) => ({
        value: item,
        label: item,
        color: 'rgb(255 200 107);',
    }));



    return (
        <section className="card card-body shadow-lg">
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Informações de Tratamento
                <br />
                <span className="text-xs font-bold text-secondary-500">Obrigatório (*)</span>
            </h4>

            <ControlSwitchDiv
                name="fast_test"
                label="Testes rápidos?"
                className="mt-2 lg:w-16 lg:h-7 w-[3.72rem] h-6"
            >
                <div className="mt-2">
                    <FieldControlSelect
                        label="Selecione uma ou mais opções:"
                        placeholder="Selecione uma ou mais atividades"
                        isMulti
                        name="activity"
                        options={options}
                    />

                    <FieldTextArea
                        label="Orientações e Anotações"
                        className="rounded-md w-full border-gray-300"
                        component="textarea"
                        name="observations"
                        type="text"
                    />

                </div>
            </ControlSwitchDiv>
            <ControlSwitchDiv
                name="apply_medicine"
                label="Aplicar Medicação"
            >
                <Medicines />
            </ControlSwitchDiv>

            <ControlSwitchDiv
                name="apply_vaccine"
                label="Aplicar vacina?"
            >
                <Vaccines />
            </ControlSwitchDiv>
            <ControlSwitchDiv
                name="apply_exam"
                label="Aplicar exame?"
            >
                <Exams />
            </ControlSwitchDiv>

            <ControlSwitchDiv
                name="apply_disease"
                label="Possui doença?"
            >
                <Diseases />
            </ControlSwitchDiv>
            <ControlSwitchDiv
                name="apply_nutrition"
                label="Aplicar nutrição alimentar?"
            >
                <Nutritions />
            </ControlSwitchDiv>


            <div className="flex items-center justify-center">
                <BtnCancel
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
        </section>
    );
};

export default StepTreatment;