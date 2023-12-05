
//Import images

import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";

import ControlSwitchDiv from "~/Components/molecules/control-switch-div";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldTextArea from "~/Components/molecules/field-text-area";
import { StepProps } from "~/types/helpers";

const physical_activity = ['Caminhadas', 'Corridas', 'Natação', 'Passeios', 'Cabo-de-guerra', 'Varetinhas', 'Bolinhas']

const options_physical_activity = physical_activity.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
}));

const tests = ['Teste 1', 'Teste 2', 'Teste 3', 'Teste 4', 'Teste 5']

const options = tests.map((item) => ({
    value: item,
    label: item,
    color: 'rgb(255 200 107);',
}));

const StepTreatment = ({ toggleTab, activeTab }: StepProps) => {
    return (
        <section className="card card-body shadow-lg">
            <h4 className="text-center font-sans font-semibold text-base capitalize">
                Informações de Tratamento
                <br />
                <span className="text-xs font-bold text-secondary-500">Obrigatório (*)</span>
            </h4>

            <ControlSwitchDiv
                name="activities_carry"
                label="Recomendações de atividades físicas"
            >
                <FieldControlSelect
                    label="Selecione uma ou mais opções:"
                    placeholder="Selecione uma ou mais atividades"
                    isMulti
                    name="activities_carry"
                    options={options_physical_activity}
                />
                <FieldTextArea
                    label="Orientações e Anotações"
                    className="rounded-md w-full border-gray-300"
                    component="textarea"
                    name="activities_carry.observations"
                    type="text"
                />
            </ControlSwitchDiv>

            <ControlSwitchDiv
                name="fast_test"
                label="Testes rápidos?"
                className="mt-2 lg:w-16 lg:h-7 w-[3.72rem] h-6"
            >
                <FieldTextArea
                    label="Orientações e Anotações"
                    className="rounded-md w-full border-gray-300"
                    component="textarea"
                    name="observations"
                    type="text"
                />

            </ControlSwitchDiv>
            <ControlSwitchDiv
                name="apply_medicine"
                label="Aplicar Medicação"
            >
                <FieldTextArea
                    label="Orientações e Anotações"
                    className="rounded-md w-full border-gray-300"
                    component="textarea"
                    name="medicines"
                    type="text"
                />
            </ControlSwitchDiv>

            <ControlSwitchDiv
                name="apply_vaccine"
                label="Aplicar vacina?"
            >
                <FieldTextArea
                    label="Orientações e Anotações"
                    className="rounded-md w-full border-gray-300"
                    component="textarea"
                    name="vacines"
                    type="text"
                />
            </ControlSwitchDiv>
            <ControlSwitchDiv
                name="apply_exam"
                label="Aplicar exame?"
            >
                <FieldTextArea
                    label="Orientações e Anotações"
                    className="rounded-md w-full border-gray-300"
                    component="textarea"
                    name="exams"
                    type="text"
                />
            </ControlSwitchDiv>


            <ControlSwitchDiv
                name="apply_nutrition"
                label="Aplicar nutrição alimentar?"
            >
                <FieldTextArea
                    label="Orientações e Anotações"
                    className="rounded-md w-full border-gray-300"
                    component="textarea"
                    name="nutritions"
                    type="text"
                />
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