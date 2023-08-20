import { useFormikContext } from "formik";
import InputMask from "react-input-mask";
import { Input, Label, Row } from "reactstrap";
import { BtnLabel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control/field-control";
import ListBoxTailwind from "~/Components/molecules/list-box-tailwind/list-box-tailwind";
import { StepProps } from "./types";

const StepVaccines = ({ activeTab, toggleTab }: StepProps) => {
    const { handleSubmit } = useFormikContext();

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
                <div className="mt-4">
                    <FieldControl
                        label="Valor do Pagamento ?"
                        className="  no-underline"
                        name="paymentValue"
                        component={InputMask as any}
                        mask="R$ 999,99"
                    />
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
                <BtnPrimary
                    onClick={handleSubmit}
                    type="button"
                    className="btn-label"
                    label="Próximo"
                >
                    <span className="ml-1"> Finalizar </span>
                    <i className="ri-check-line  align-middle fs-16 p-1"></i>
                </BtnPrimary>
            </div>
        </>
    );
};

export default StepVaccines;

const finalizer = null;
