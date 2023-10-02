import { Form, useFormikContext } from "formik";
import { useState } from "react";
import { Input, Label } from "reactstrap";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import FieldNumber from "~/Components/molecules/field-number/field-number";
import { StepProps } from "./types";

const StepPayment = ({ activeTab, toggleTab }: StepProps) => {
    const { handleSubmit } = useFormikContext();
    const [event, setEvent] = useState<string>('credit');

    const options = new Array(12).fill(0).map((item, index) => ({
        value: index + 1,
        label: `${index + 1} Parcela${index + 1 > 1 ? 's' : ''}`,
        color: 'rgb(255 200 107);',
    }));

    return (
        <Form onSubmit={handleSubmit} className="card card-body shadow-lg">
            <div>
                <h4 className="text-center font-sans font-semibold text-base capitalize">
                    Informações de Pagamento
                    <br />
                </h4>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="my-3 justify-center items-center flex mobile:flex-col mobile:items-start col-span-full">
                    <div className="form-check form-check-inline">
                        <Input
                            id="credit"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            defaultChecked
                            onChange={(e) => { setEvent('credit') }}
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
                            onChange={(e) => { setEvent('debit') }}
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
                            onChange={(e) => { setEvent('pix') }}
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
                            onChange={(e) => { setEvent('cash') }}
                            type="radio"
                            className="form-check-input"
                            required
                        />
                        <Label className="form-check-label" htmlFor="cash">
                            Dinheiro
                        </Label>
                    </div>
                </div>

                <FieldControlSelect
                    label="Quantidade de Parcelas"
                    placeholder="Selecione a quantidade de parcelas"
                    name="installments"
                    options={options}
                    isDisabled={event !== 'credit'}
                />
                <FieldNumber
                    label="Valor do Pagamento? (R$)"
                    name="paymentValue"
                />
            </div>

            <div className="flex align-items-center justify-center gap-3 mt-4">
                <BtnCancel
                    label="Voltar"
                    onClick={() => {
                        toggleTab(activeTab - 1);
                    }}
                />
                <BtnPrimary
                    type="submit"
                    label="Concluir Consulta"
                />
            </div>
        </Form>
    );
};

export default StepPayment;