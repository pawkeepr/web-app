import { useFormikContext } from 'formik'
import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import LOADING from '~/constants/loading'
import { useAppSelector } from '~/store/hooks'
import type { ActivateAccount } from '../../activate'
import type { StepProps } from './types'

const listItem = 'flex gap-1 font-semibold text-gray-500 p-1 text-center w-full'
const strongText = 'text-gray-700 mr-2'
const pStyle = 'text-center w-full text-sm flex flex-row'

const StepFinally = ({ prevStep }: StepProps) => {
    const { values, isValid, handleSubmit } = useFormikContext<ActivateAccount>()

    const isLoading = useAppSelector(
        (state) =>
            state.Profile.isLoading === LOADING.PENDING ||
            state.Profile.isLoading === LOADING.SUCCESS,
    )

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        handleSubmit()
    }

    return (
        <div>
            <h4 className="my-2 font-sans text-base font-semibold text-center text-primary-600">
                Informações de Cadastro
            </h4>

            <ul className="grid grid-cols-3 mobile:grid-cols-1">
                <li className={`${listItem}`}>
                    <p className={pStyle}>
                        <strong className={strongText}>Nome:</strong>
                        <span className="text-capitalize ">
                            {values.firstName} {values.lastName}
                        </span>
                    </p>
                </li>

                <li className={listItem}>
                    <p className={pStyle}>
                        <strong className={strongText}>Documento:</strong>
                        <span className="">{values.cpf_cnpj}</span>
                    </p>
                </li>

                <li className={listItem}>
                    <p className={pStyle}>
                        <strong className={strongText}>WhatsApp:</strong>
                        <span className="">{values?.contact?.whatsapp}</span>
                    </p>
                </li>
            </ul>

            <h4 className="mb-2 font-sans text-base font-semibold text-center text-primary-600">
                Endereço
            </h4>

            <ul className="grid grid-cols-3 mobile:grid-cols-1">
                <li className={listItem}>
                    <p className={pStyle}>
                        <strong className={strongText}>CEP:</strong>
                        <span className="">{values?.location?.zipCode}</span>
                    </p>
                </li>
                <li className={listItem}>
                    <p className={pStyle}>
                        <strong className={strongText}>Estado:</strong>
                        <span className="text-capitalize ">
                            {values?.location?.state}
                        </span>
                    </p>
                </li>
                <li className={listItem}>
                    <p className={pStyle}>
                        <strong className={strongText}>Cidade:</strong>
                        <span className="text-capitalize ">
                            {values?.location?.city}
                        </span>
                    </p>
                </li>

                <li className={listItem}>
                    <p className={pStyle}>
                        <strong className={strongText}>Rua:</strong>
                        <span className="text-capitalize ">
                            {values?.location?.street}
                        </span>
                    </p>
                </li>
                <li className={listItem}>
                    <p className={pStyle}>
                        <strong className={strongText}>Número:</strong>
                        <span className="">{values?.location?.number}</span>
                    </p>
                </li>
                <li className={listItem}>
                    <p className={pStyle}>
                        <strong className={strongText}>Bairro:</strong>
                        <span className="text-capitalize ">
                            {values?.location?.neighborhood}
                        </span>
                    </p>
                </li>
                <li className={`${listItem} col-span-full`}>
                    <p className={pStyle}>
                        <strong className={strongText}>Complemento:</strong>
                        <span className="text-capitalize ">
                            {values?.location?.complement || 'Não informado'}
                        </span>
                    </p>
                </li>
            </ul>
            <div className="flex items-center justify-center w-full gap-2 mt-1 col-span-full">
                <BtnNeutral
                    outline
                    className="border-none"
                    condition={!isLoading}
                    disabled={isLoading}
                    onClick={prevStep}
                    label="Anterior"
                />
                <BtnPrimary
                    isLoading={isLoading}
                    label="Cadastrar"
                    type="submit"
                    onClick={handleClick}
                    disabled={!isValid}
                />
            </div>
        </div>
    )
}

export default StepFinally
