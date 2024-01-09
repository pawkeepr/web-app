import cn from 'classnames';

type PasswordRulesProps = {
    value: string;
};

const rulePassLength = RegExp('(.{8,})');
const rulePassLower = RegExp('(.*[a-z].*)');
const rulePassUpper = RegExp('(.*[A-Z].*)');
const rulePassNumber = RegExp('(.*[0-9].*)');
const rulePassSpecial = RegExp('(.*[!@#$%^&*()_+].*)');

const rules = [
    {
        name: 'pass-length',
        condition: rulePassLength,
        text: 'Mínimo 8 caracteres,',
    },
    {
        name: 'pass-lower',
        condition: rulePassLower,
        text: 'uma letra minúscula (a-z),',
    },
    {
        name: 'pass-upper',
        condition: rulePassUpper,
        text: 'uma letra maiúscula (A-Z),',
    },
    {
        name: 'pass-number',
        condition: rulePassNumber,
        text: 'um número (0-9)',
    },
    {
        name: 'pass-special',
        condition: rulePassSpecial,
        text: 'e um caractere especial (!@#$%^&*()_+)',
    },
];

const PasswordRules = ({ value }: PasswordRulesProps) => {
    return (
        <div className="mt-1">
            <h4 className="text-xs italic font-semibold">Senha deve conter:</h4>
            <div className="text-center">
                {rules.map((rule, index) => (
                    <span
                        key={index}
                        data-testid={rule.name}
                        id={rule.name}
                        className={cn('text-xs font-sans font-semibold mr-1', {
                            'text-primary-500': rule.condition.test(
                                value.trim(),
                            ),
                            'text-gray-500': !rule.condition.test(value.trim()),
                        })}
                    >
                        {rule.text}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PasswordRules;
