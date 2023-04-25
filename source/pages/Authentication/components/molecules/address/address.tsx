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
        setFieldValue('address.number', value)
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
                <FieldControl
                    divClassName='my-1'
                    className="form-control"
                    type="text"
                    label="Estado"
                    name="address.state"
                    disabled={disabledInputs.state || loading}
                    placeholder={loading ? 'Carregando...' : 'Digite o nome do estado'}
                    required
                />
            </div>
            <div className="col-span-1">
                <FieldControl
                    divClassName='my-1'
                    className="form-control"
                    type="text"
                    label="Cidade"
                    name="address.city"
                    disabled={disabledInputs.city || loading}
                    placeholder={loading ? 'Carregando...' : 'Digite o nome da cidade'}
                    required
                />
            </div>
            <div className="grid grid-cols-4 col-span-full gap-1">
                <div className="col-span-1">
                    <FieldControl
                        divClassName='my-1'
                        className="form-control"
                        type="text"
                        label="Bairro"
                        name="address.neighborhood"
                        disabled={disabledInputs.neighborhood || loading}
                        placeholder={loading ? 'Carregando...' : 'Digite o nome do bairro'}
                        required
                    />
                </div>
                <div className="col-span-3">

                    <FieldControl
                        divClassName='my-1'
                        label='Rua'
                        name="address.street"
                        aria-label="street"
                        className="form-control w-70"
                        disabled={disabledInputs.street || loading}
                        placeholder={loading ? 'Carregando...' : 'Digite o nome da rua'}
                        required
                        disabledError
                    >
                        <Form.Control
                            type="text"
                            name="address.number"
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
                </div >
            </div>
            <div className="col-span-full">

                <FieldControl
                    divClassName='my-1'
                    className="form-control"
                    type="text"
                    label="Complemento"
                    name="address.complement"
                    disabled={disabledInputs.complement || loading}
                    placeholder={loading ? 'Carregando...' : "Digite o complemento (opcional)"}
                />
            </div>

        </div>
    )
}

export default AddressInputs