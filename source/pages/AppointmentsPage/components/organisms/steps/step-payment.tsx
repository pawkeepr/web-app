import { Form, useFormikContext } from "formik";
import { useState } from "react";
import InputMask from "react-input-mask";
import { Input, Label } from "reactstrap";
import { BtnCancel, BtnPrimary } from "~/Components/atoms/btn";
import FieldControl from "~/Components/molecules/field-control/field-control";
import FieldControlSelect from "~/Components/molecules/field-control/field-control-select";
import { StepProps } from "./types";

const StepVaccines = ({ activeTab, toggleTab }: StepProps) => {
    const { handleSubmit } = useFormikContext();
    const [event, setEvent] = useState<string>('credit');

    const options = new Array(12).fill(0).map((item, index) => ({
        value: index + 1,
        label: `${index + 1} Parcela${index + 1 > 1 ? 's' : ''}`,
        color: 'rgb(255 200 107);',
    }));

    return (
        <Form onSubmit={handleSubmit}>
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

                <div className="flex flex-col md:flex-row gap-3 mt-4">
                    {
                        event === 'credit' && (
                            <>
                                <p className="text-gray-600">Quantas parcelas?</p>
                                <FieldControlSelect
                                    placeholder="Selecione a quantidade de parcelas"
                                    name="installments"
                                    options={options}
                                />
                            </>
                        )
                    }

                    <div className="w-full">
                        <FieldControl
                            label="Valor do Pagamento?"
                            className="form-control border-2 h-9 border-gray-200"
                            name="paymentValue"
                            component={InputMask as any}
                            mask="R$ 999,99"
                        />
                    </div>
                </div>
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
                    type="submit"
                    label="Concluir Consulta"
                />
            </div>
        </Form>
    );
};

export default StepVaccines;

const finalizer = null;
