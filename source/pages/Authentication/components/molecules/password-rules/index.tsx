import classnames from 'classnames';
import { useEffect, useState } from 'react';

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

        <div className="card p-3 bg-light rounded">
            <h4 className="fs-11">Senha deve conter:</h4>
            <ul className="list-group list-group-flush">
                <li id="pass-length"
                    className={
                        classnames({
                            'list-group-item fs-10': true,
                            'text-success': passLength,
                            'text-danger': !passLength
                        })
                    }
                >
                    Mínimo <b>8 caracteres</b>
                </li>
                <li id="pass-lower"
                    className={
                        classnames({
                            'list-group-item fs-10': true,
                            'text-success': passLower,
                            'text-danger': !passLower
                        })
                    }
                >
                    Uma letra <b>minúscula</b> (a-z)
                </li>
                <li id="pass-upper"
                    className={
                        classnames({
                            'list-group-item fs-10': true,
                            'text-success': passUpper,
                            'text-danger': !passUpper
                        })
                    }
                >
                    Uma letra <b>maiúscula</b> (A-Z)
                </li>
                <li id="pass-number"
                    className={
                        classnames({
                            'list-group-item fs-10': true,
                            'text-success': passNumber,
                            'text-danger': !passNumber
                        })
                    }
                >Um <b>número</b> (0-9)
                </li>
            </ul>
        </div>

    )
}

export default PasswordRules