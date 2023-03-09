import Form from 'react-bootstrap/Form'
import FieldControl from '~/Components/molecules/field-control/field-control'

const Address = () => {
    return (
        <>
            <FieldControl
                className="form-control"
                type="text"
                label="CEP"
                name="zipcode"
                placeholder="Digite o CEP"
                required
            />
            <FieldControl
                className="form-control"
                type="text"
                label="Estado"
                name="state"
                placeholder="Digite o nome do estado"
                required
            />
            <FieldControl
                className="form-control"
                type="text"
                label="Cidade"
                name="city"
                placeholder="Digite o nome da cidade"
                required
            />
            <FieldControl
                className="form-control"
                type="text"
                label="Bairro"
                name="neighborhood"
                placeholder="Digite o nome do bairro"
                required
            />

            <FieldControl
                label='Rua'
                name="street"
                aria-label="street"
                className="form-control w-70"
                placeholder="Rua"
                required
                disabledError
            >

                <Form.Control
                    label='Número'
                    type="text"
                    name="number"
                    aria-label="number"
                    placeholder="Número"
                    required
                    className='ms-1 w-20'
                    style={{
                        maxWidth: '20%'
                    }}

                />

            </FieldControl>

            <FieldControl
                className="form-control"
                type="text"
                label="Complemento"
                name="complement"
                placeholder="Digite o complemento (opcional)"
            />

        </>
    )
}

export default Address