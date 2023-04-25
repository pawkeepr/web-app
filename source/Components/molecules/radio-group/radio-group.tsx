
import { useField } from 'formik'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


interface RadioGroupProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    items: (T & { name: string, value: any })[]
    name: string
}

export default function RadioGroup<T>({ items = [], name, className, ...rest }: RadioGroupProps<T>) {

    const [field, meta] = useField(name)

    return (
        <Row className={`w-full ${className}`} {...rest}>
            <Col sm={12}>
                <div className="mx-auto w-full relative">
                    {
                        items.map((item, index) => (
                            <div className="form-check form-check-inline" key={index}>
                                <input
                                    id={item.name}
                                    type="radio"
                                    className="form-check-input"
                                    required
                                    {...field}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={item.name}
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </Col>
        </Row>
    )
}
