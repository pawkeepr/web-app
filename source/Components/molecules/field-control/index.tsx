import { useField } from 'formik';
import Form from 'react-bootstrap/Form';
import { If } from '~/utils/tsx-control-statements';

import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import ErrMessage from '~/Components/atoms/err-message';

type InputControlProps = {
    [key: string]: any
    name: string
    label?: string
    required?: boolean
    disabledError?: boolean
    component?: JSX.Element
    startChildren?: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]
    children?: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]

}

const FieldControl = ({ label, children, required = false, component, startChildren, disabledError = false, ...props }: InputControlProps) => {

    const [inputProps, meta] = useField(props)
    const id = props.name || props.id

    const InputComponent = component as any


    return (
        // <div className="mb-2 position-relative" style={{ height: '92px', maxHeight: '92px' }}>
        <>
            <If condition={!!label}>
                <Form.Label htmlFor={id} className="mb-0 list-group-item fs-12">
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
                    required={required}
                    {...inputProps}
                    {...props}
                />

                {children}

            </InputGroup>
            <If condition={!disabledError && meta.touched && !!meta.error}>
                <ErrMessage message={meta.error?.toString() as string} />
            </If>
        </>
        //  </div> 
    )
}

FieldControl.defaultProps = {
    component: Form.Control
}

export default FieldControl