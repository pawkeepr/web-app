import { Col, Input, Label, Row } from "reactstrap";

import { BtnLabel, BtnSuccess } from "~/Components/atoms/btn";
import { StepProps } from "./types";
import ListBoxTailwind from "~/Components/molecules/list-box-tailwind/list-box-tailwind";

const StepVaccines = ({ activeTab, toggleTab }: StepProps) => {
    return (
        <>
            <div>
                <h2 className="text-lg">Pagamento</h2>
            </div>

            <div>
                <div className="my-3 justify-center items-center flex mobile:flex-col mobile:items-start">
                    <div className="form-check form-check-inline">
                        <Input
                            id="credit"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            defaultChecked
                            required
                        />
                        <Label className="form-check-label" htmlFor="credit">
                            Cartão de Crédito
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="debit"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="debit">
                            Cartão de Débito
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="pix"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="pix">
                            Pix
                        </Label>
                    </div>
                    <div className="form-check form-check-inline">
                        <Input
                            id="cash"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="cash">
                            Dinheiro
                        </Label>
                    </div>
                </div>

                <Row className="gy-3">{<ListBoxTailwind />}</Row>
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
                    className="btn-label"
                    label="Próximo"
                    onClick={() => {}}
                >
                    <span className="ml-1"> Próximo </span>
                    <i className="ri-check-line  align-middle fs-16 p-1"></i>
                </BtnSuccess>
            </div>
        </>
    );
};

export default StepVaccines;

const finalizer = null;
