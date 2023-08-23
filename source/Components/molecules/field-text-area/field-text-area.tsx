import { useField } from 'formik';

import cn from 'classnames';

import type { FieldTextAreaProps } from './types';

import Input from '../../atoms/text-area';

import { twMerge } from 'tailwind-merge';
import Label from '~/Components/atoms/label';
import withControl from '~/Components/helpers/with-control';

const FieldTextArea = <T,>({
    endIcon,
    input = Input,
    required = false,
    startIcon = false,
    disabled = false,
    onChange,
    className,
    div,
    label,
    ...rest
}: FieldTextAreaProps<T>
) => {
    const [field, meta] = useField(rest as any);
    const id = rest.id || rest.name;
    const ComponentInput = input as any;
    const error = meta.touched && meta.error;

    const handleChange = (e: any) => {
        onChange?.(e);
        field.onChange(e);
    }

    return (
        <div className="w-full pb-3" {...div} >
            <Label htmlFor={id} condition={label} required={required} label={label} />

            <div className="relative">
                {startIcon && (
                    <div className="absolute inset-y-0 flex items-center pl-1 text-sm text-gray-400 pointer-events-none left-1">
                        {startIcon}
                    </div>
                )}
                <ComponentInput
                    id={id}
                    className={
                        twMerge(
                            cn(
                                {
                                    'bg-slate-100': disabled,
                                    '!pl-8': startIcon,
                                    '!pr-8': endIcon,
                                },

                            ), className)
                    }
                    {...field}
                    {...rest}
                    disabled={disabled}
                    onChange={handleChange}
                    required={required}
                />

                {endIcon && (
                    <div className={`absolute top-1/2 transform -translate-y-1/2 right-0 mr-2`}>
                        {endIcon}
                    </div>
                )}
            </div>

            {error && (
                <div className="w-full text-xs text-center text-red-700">
                    {meta.error}
                </div>
            )}
        </div>
    );
};

export default withControl(FieldTextArea);