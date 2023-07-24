import { useState } from 'react'
import { useField } from 'formik'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from "react-bootstrap/Form"
import ErrMessage from "~/Components/atoms/err-message"

type Item = {
    label: string
    value: any
}

interface CheckboxGroupProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    items: Item[]
    name: string
    label: string
    required?: boolean
    disabledError?: boolean
    divClassName?: string
}

export default function CheckboxGroup<T>({ items = [], name, label, required, className, id, disabledError, divClassName, ...rest }: CheckboxGroupProps<T>) {

    const [field, meta, helpers] = useField(name)
    const display =
        !disabledError && meta.touched && !!meta.error ? "block" : "none";

    const { setValue } = helpers

    const [checkedValues, setCheckedValues] = useState<string[]>([])

    function setCheckboxValue(name: string){
        if(!checkedValues.includes(name)){
            return setCheckedValues(values => {
                const result = [...values, name]
                setValue(result)
                return result
            })
        }

        setCheckedValues(values => {
            const result = values.filter(element => element !== name)
            setValue(result)
            return result 
        })        
    }
    
    return (
        <div className={divClassName}>
             <Form.Label
                htmlFor={name} className="mb-1 list-group-item fs-12" data-testid={`label-${name}`}
            >
                {label}
                {
                    !!required && <span className="text-danger">*</span>
                }
            </Form.Label>
            <Row className={`w-full mb-1 ${className}`} {...rest}>
                <Col sm={12}>
                    <div className="mx-auto w-full relative flex justify-center items-center flex-wrap gap-2">
                        {
                            items.map((item, index) => (
                                <div className="form-check form-check-inline" key={index}>
                                    <input
                                        id={item.label}
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={checkedValues.includes(item.value)}
                                         {...field}
                                        onChange={() => setCheckboxValue(item.value)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={item.label}
                                    >
                                        {item.label}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </Col>
            </Row>

            <ErrMessage
                message={meta.error?.toString() as string}
                data-testid={`err-${id}`}
                style={{
                    display,
                }}
            />
        </div>
    )
}
