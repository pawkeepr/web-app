import { useFormikContext } from 'formik';

import { useCallback } from 'react';
import { Props } from 'react-select';
import Label from '~/Components/atoms/label';
import Select from '~/Components/atoms/select';
import type { InputControlProps } from './types';

type Option = {
    value: string | number;
    label: string;
    [key: string]: unknown;
};

type FieldSelectControl<Ctx> = InputControlProps<Props, Ctx> & {
    name: string;
    deps?: unknown[];
    onChangeValue?: (item: unknown) => void;
    options?: Option[];
};

const FieldControlSelect = <Ctx,>({
    label,
    required = false,
    className,
    name,
    divClassName,
    options = [],
    onChangeValue = () => {},
    ...props
}: FieldSelectControl<Ctx>) => {
    const { values, setFieldValue } = useFormikContext<Ctx>();

    const onChange = useCallback(
        (option: unknown) => {
            onChangeValue?.(option);
            setFieldValue(name, option, true);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setFieldValue],
    );

    return (
        <div className={divClassName}>
            <Label
                label={label}
                required={required}
                id={name}
                separator={':'}
            />
            <Select
                {...props}
                id={name}
                required={required}
                className={required ? 'border-secondary-500' : ''}
                options={options}
                name={name}
                onChange={onChange}
                value={props.value ?? values?.[name]}
            />
        </div>
    );
};

export default FieldControlSelect;
