import { useEffect, useState } from 'react';
import ItemListChecked from '../../atoms/item-list-checked';

type PasswordRulesProps = {
    value: string
}


const rulePassLength = RegExp('(.{8,})')
const rulePassLower = RegExp('(.*[a-z].*)')
const rulePassUpper = RegExp('(.*[A-Z].*)')
const rulePassNumber = RegExp('(.*[0-9].*)')


const PasswordRules = ({ value }: PasswordRulesProps) => {

    const [passLength, setPassLength] = useState(false)
    const [passLower, setPassLower] = useState(false)
    const [passUpper, setPassUpper] = useState(false)
    const [passNumber, setPassNumber] = useState(false)

    useEffect(() => {
        setPassLength(rulePassLength.test(value.trim()))
        setPassLower(rulePassLower.test(value.trim()))
        setPassUpper(rulePassUpper.test(value.trim()))
        setPassNumber(rulePassNumber.test(value.trim()))
    }, [value])

    return (

        <div className="card p-3 bg-light rounded shadow-none">
            <h4 className="fs-11">Senha deve conter:</h4>
            <ul className="list-group list-group-flush">
                <ItemListChecked name="pass-length" condition={passLength} text="Mínimo 8 caracteres" />
                <ItemListChecked name="pass-lower" condition={passLower} text="Uma letra minúscula (a-z)" />
                <ItemListChecked name="pass-upper" condition={passUpper} text="Uma letra maiúscula (A-Z)" />
                <ItemListChecked name="pass-number" condition={passNumber} text="Um número (0-9)" />
            </ul>
        </div>

    )
}

export default PasswordRules