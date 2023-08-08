import { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import FieldControl, { InputControlProps } from "../field-control";

import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/solid/EyeSlashIcon";


const FieldPassword = (props: InputControlProps) => {
    const [passwordShow, setPasswordShow] = useState(false);

    const onToggleVisiblePassword = () => {
        setPasswordShow(state => !state)
    }

    return (
        <FieldControl {...props}>
            <InputGroup.Text className="bg-transparent border-start-0">
                <button onClick={onToggleVisiblePassword}>
                    {
                        passwordShow && <EyeIcon className="w-5 h-5 text-gray-500" />
                    }
                    {
                        !passwordShow && <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                    }
                </button>
            </InputGroup.Text>
        </FieldControl>
    )
}

export default FieldPassword