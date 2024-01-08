import {
    InputNumberFormat,
    InputNumberFormatProps,
} from '@react-input/number-format';
import FieldControl, {
    InputControlProps,
} from '~/Components/molecules/field-control';

import { input } from '~/Components/atoms/input';

const FieldNumber = <Ctx,>({
    placeholder,
    name,
    locales = 'en-US',
    maximumFractionDigits = 2,
    groupDisplay = false,
    ...props
}: InputControlProps<InputNumberFormatProps, Ctx>) => {
    return (
        <FieldControl
            {...props}
            placeholder={placeholder || 'Digite aqui...'}
            name={name}
            locales={locales}
            groupDisplay={groupDisplay}
            maximumFractionDigits={maximumFractionDigits}
            component={InputNumberFormat}
            className={input({ className: props.className })}
        />
    );
};

export default FieldNumber;
