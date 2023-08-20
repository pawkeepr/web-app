import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import MaskedInput from "react-input-mask";
import FieldControl from "~/Components/molecules/field-control/";
// ... Existing code ...

type NumberWhatsAppProps = {
    name: string;
}

const NumberWhatsapp = ({ name }: NumberWhatsAppProps) => {
    const [phoneValue, setPhoneValue] = useState<string | any>(undefined);
    const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);
    const [clickAppInput, setClickAppInput] = useState(false);

    // guarda o valor do input de telefone
    const handlePhoneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(event.target.value);

    };

    // atualiza o estado do input de whatsapp para true
    const copyPhoneToWhatsapp = () => {
        if (phoneValue !== undefined) {
            setClickAppInput(true)
            // setShowWhatsAppInput(true);
        }
    };

    return (
        <div>
            <div className="relative w-full items-center">
                <div className="relative">
                    <FieldControl
                        className="focus-visible:bg-transparent hover:bg-transparent focus:bg-transparent bg-transparent flex form-control"
                        // divClassName="my-1"
                        type="text"
                        label="Telefone/Celular"
                        name={name}
                        placeholder="Digite o seu Número de Telefone"
                        component={MaskedInput as any}
                        mask={"(99) 99999-9999"}
                        maskChar={null}
                        required
                        onChange={handlePhoneInputChange}
                    />
                    <div
                        onClick={copyPhoneToWhatsapp}
                        className="flex justify-center items-center"
                    >
                        <p className="text-xs mr-2 mb-2 md:m-2">
                            Clique no ícone do whatsapp para duplicar o telefone no campo abaixo:
                        </p>
                        <FaWhatsapp onClick={copyPhoneToWhatsapp} className="text-green-600 text-xl cursor-pointer" />
                    </div>
                </div>


            </div>
            <div>
                {
                    // input de whatsapp com o mesmo numero do telefone caso o usuário clique no ícone do whatsapp
                    clickAppInput ? (
                        <FieldControl
                            className="form-control"
                            // divClassName="my-1"
                            type="text"
                            label="WhatsApp"
                            name="whatsapp"
                            placeholder="Digite o seu Número do WhatsApp"
                            component={MaskedInput as any}
                            mask={"(99) 99999-9999"}
                            maskChar={null}
                            value={phoneValue}
                            required
                        />)
                        : (
                            <FieldControl
                                className="form-control"
                                // divClassName="my-1"
                                type="text"
                                label="WhatsApp"
                                name="whatsapp"
                                placeholder="Digite o seu Número do WhatsApp"
                                component={MaskedInput as any}
                                mask={"(99) 99999-9999"}
                                maskChar={null}
                                value={""}
                                required
                            />)
                }
            </div>
        </div>
    );
};

export default NumberWhatsapp;