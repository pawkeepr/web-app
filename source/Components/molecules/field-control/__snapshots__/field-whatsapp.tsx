import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import FieldControl from "~/Components/molecules/field-control";
import MaskedInput from "react-input-mask";
// ... Existing code ...

const NumberWhatsapp = () => {
    const [phoneValue, setPhoneValue] = useState<string | any>(undefined);
    const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);

    // guarda o valor do input de telefone
    const handlePhoneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(event.target.value);
    };

    // atualiza o estado do input de whatsapp para true
    const copyPhoneToWhatsapp = () => {
        if (phoneValue !== undefined) {
            setShowWhatsAppInput(true);
        }
    };

    return (
        <div>
            <div className="relative w-full items-center">
                <div className="relative">
                    <FieldControl
                        className="form-control"
                        divClassName="my-1"
                        type="text"
                        label="Telefone/Celular"
                        name="phone"
                        placeholder="Digite o seu Número de Telefone"
                        component={MaskedInput as any}
                        mask={"(99) 99999-9999"}
                        maskChar={null}
                        required
                        onChange={handlePhoneInputChange}
                    />
                </div>
                <div
                    className="absolute top-1/2 right-7 cursor-pointer transform -translate-y-1/2 z-10"
                    onClick={copyPhoneToWhatsapp}
                >
                    <FaWhatsapp className="flex absolute justify-center text-green-600 text-lg" />
                </div>
            </div>
                <div>
                    {
                        // mostra o input de whatsapp caso o usuário clique no ícone do whatsapp
                        showWhatsAppInput && (
                            <FieldControl
                            className="form-control"
                            divClassName="my-1"
                            type="text"
                            label="WhatsApp"
                            name="whatsapp"
                            placeholder="Digite o seu Número do WhatsApp"
                            component={MaskedInput as any}
                            mask={"(99) 99999-9999"}
                            maskChar={null}
                            value={phoneValue || ""}
                            required
                        />)
                    }
                </div>
        </div>
    );
};

export default NumberWhatsapp;