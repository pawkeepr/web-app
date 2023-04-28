import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import { If } from '~/utils/tsx-control-statements';

import InputGroup from 'react-bootstrap/InputGroup';
import ErrMessage from '~/Components/atoms/err-message';

import { useEffect, useRef } from 'react';
import type { InputControlProps } from './types';

const FieldControl = ({
    label,
    children,
    required = false,
    component,
    startChildren,
    disabledError = false,
    className,
    initialFocus = false,
    divClassName,
    ...props
}: InputControlProps) => {

    const ref = useRef<HTMLInputElement>(null)
    const { current } = ref


    useEffect(() => {
        if (!initialFocus) return

        if (!current?.focus) {
            console.warn('FieldControl: initialFocus is true, but the component does not have the focus method')
        }

        if (current?.focus) {
            current.focus()
        }

    }, [current, initialFocus])

    const [inputProps, meta] = useField(props)
    const id = props.name || props.id

    const InputComponent = component as any
    const display = !disabledError && meta.touched && !!meta.error ? 'block' : 'none'

    return (
        <div className={divClassName}>
            <If condition={!!label}>
                <Form.Label htmlFor={id} className="mb-0 list-group-item fs-12" data-testid={`label-${id}`}>
                    {label}
                    <If condition={required}>
                        <span className="text-danger">*</span>
                    </If>
                </Form.Label>
            </If>
            <InputGroup className="position-relative mb-2">

                {startChildren}


                <InputComponent
                    id={id}
                    ref={ref || props.ref}
                    required={required}
                    data-testid={`input-${id}`}
                    className={`
                        ${className}
                        focus-within:!outline-1
                        focus:!border-primary-500
                        disabled:!cursor-not-allowed
                        disabled:!opacity-25
                        focus:!border-2
                    `}
                    {...inputProps}
                    {...props}
                />

                {children}

            </InputGroup>
            <ErrMessage
                message={meta.error?.toString() as string}
                data-testid={`err-${id}`}
                style={{
                    display
                }}
            />
        </div>
    )
}

FieldControl.defaultProps = {
    component: 'input'
}

export default FieldControl