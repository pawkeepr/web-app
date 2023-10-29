/* eslint-disable react/jsx-no-undef */

import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";


import ComboBoxFields from "~/Components/modals/add-pet-modal/components/organisms/combo-box-fields";
import { StepProps } from "~/types/helpers";





const StepPet = ({ toggleTab, activeTab }: StepProps) => {

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

                <ComboBoxFields name="pet_data" />



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
