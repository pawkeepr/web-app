import { useState } from "react";
import FieldControl, { InputControlProps } from "../field-control";

import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/solid/EyeSlashIcon";


const FieldPassword = (props: InputControlProps) => {
    const [passwordShow, setPasswordShow] = useState(false);

    const onToggleVisiblePassword = () => {
        setPasswordShow(state => !state)
    }

    return (
        <FieldControl {...props} type={passwordShow ? "text" : "password"}>
            <button onClick={onToggleVisiblePassword} type="button" className="p-2 flex item-center justify-center">
                {
                    passwordShow && <EyeIcon className="w-5 h-5 text-gray-500" />
                }
                {
                    !passwordShow && <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                }
            </button>
        </FieldControl>
    )
}

export default FieldPassword