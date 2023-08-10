import { BtnLabel, BtnSuccess } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control/field-control"
import { StepProps } from "./types";

const StepInfo = ({ toggleTab, activeTab }: StepProps) => {


    return (
        <>
        <div>
            <h4 className="text-center">Tratamento</h4>
        </div><div className="mt-4">
                <span className="font-bold">Informações Obrigatórias</span>
                <div className="flex items-center mt-2 gap-2 w-full">
                    <FieldControl
                        label="Peso"
                        className="rounded-md form-control font-semibold "
                        name="weight"
                        type="number" />
                    <div className="flex flex-col mb-[6px] w-full">
                        <span className=" text-xs">Medida:</span>
                        <select
                            className="form-control mt-2 border-2"
                            name="measureWeight"
                        >
                            <option value="kg">Kilogramas</option>
                            <option value="g">Gramas</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col mt-2">
                    <FieldControl
                        label="Orientações e Anotações"
                        className="rounded-md form-control"
                        component="textarea"
                        name="observations"
                        type="text" />
                </div>
            </div>
            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnLabel
                    link
                    type="button"
                    className="right  previestab"
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                >
                    <i className="ri-arrow-left-line  align-middle fs-16 me-2"></i>{" "}
                    Voltar
                </BtnLabel>
                <BtnSuccess
                    type="button"
                    className="btn-label "
                    label="Próximo"
                    onClick={() => {
                        toggleTab(activeTab + 1);
                    }}
                >
                    <span className="ml-1"> Próximo </span>
                    <i className="ri-arrow-right-line  align-middle fs-16  p-1"></i>
                </BtnSuccess>
            </div>
            
            </>
    )
 }

export default StepInfo