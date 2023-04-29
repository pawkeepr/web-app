
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import {
    Input,
    Label
} from 'reactstrap'


type RadioGroupProps<T> = {
    items: (T & { name: string, value: string })[]
    name: string
}

export default function RadioGroup<T>({ items = [], name }: RadioGroupProps<T>) {

    return (
        <Row className="w-full">
            <Col sm={12}>
                <div className="mx-auto w-full relative">
                    {
                        items.map((item, index) => (
                            <div className="form-check form-check-inline" key={index}>
                                <Input
                                    id={item.name}
                                    name={name}
                                    type="radio"
                                    className="form-check-input"
                                    required
                                />
                                <Label
                                    className="form-check-label"
                                    htmlFor="credit"
                                >
                                    {item.name}
                                </Label>
                            </div>
                        ))
                    }
                </div>
            </Col>
        </Row>
    )
}
