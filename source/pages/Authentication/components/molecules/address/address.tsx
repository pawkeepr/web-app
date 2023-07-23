import { useFormikContext } from 'formik';
import Form from 'react-bootstrap/Form';
import FieldControl from '~/Components/molecules/field-control/field-control';
import { AccountSignUp } from '~/store/auth/register/types';

type AddressProps = {
    loading: boolean
    disabledInputs: {
        state: boolean
        city: boolean
        neighborhood: boolean
        street: boolean
        complement: boolean
    }
}
const AddressInputs = ({ loading, disabledInputs }: AddressProps) => {

    const { setFieldValue } = useFormikContext<AccountSignUp>()

    const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setFieldValue('number', value)
    }

    return (
        <>
                <FieldControl
                    className="form-control"
                    type="text"
                    label="Estado"
                    name="state"
                    disabled={disabledInputs.state || loading}
                    placeholder={loading ? 'Carregando...' : 'Digite o nome do estado'}
                    required
                />
                <FieldControl
                    className="form-control"
                    type="text"
                    label="Cidade"
                    name="city"
                    disabled={disabledInputs.city || loading}
                    placeholder={loading ? 'Carregando...' : 'Digite o nome da cidade'}
                    required
                />
                    <FieldControl
                            className="form-control"
                        type="text"
                        label="Bairro"
                        name="neighborhood"
                        disabled={disabledInputs.neighborhood || loading}
                        placeholder={loading ? 'Carregando...' : 'Digite o nome do bairro'}
                        required
                    />

                    <FieldControl
                            label='Rua'
                        name="street"
                        aria-label="street"
                        className="form-control w-70"
                        disabled={disabledInputs.street || loading}
                        placeholder={loading ? 'Carregando...' : 'Digite o nome da rua'}
                        required
                        disabledError
                    >
                        <Form.Control
                            type="text"
                            name="number"
                            aria-label="number"
                            placeholder="N°"
                            required
                            onChange={onChangeNumber}
                            className='ms-1 w-20'
                            style={{
                                maxWidth: '20%'
                            }}
                        />
                    </FieldControl>
            <div className="col-span-full">

                <FieldControl
                    className="form-control"
                    type="text"
                    label="Complemento"
                    name="complement"
                    disabled={disabledInputs.complement || loading}
                    placeholder={loading ? 'Carregando...' : "Digite o complemento (opcional)"}
                />
            </div>

        </>
    )
}

export default AddressInputs