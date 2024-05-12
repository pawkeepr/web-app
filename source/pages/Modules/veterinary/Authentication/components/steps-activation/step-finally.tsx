import cn from 'classnames'
import { useFormikContext } from 'formik'
import { BtnNeutral, BtnPrimary } from '~/Components/atoms/btn'
import {
    Pets,
    Services,
    Specialty,
    SpecialtyAnimals,
    type KeysPets,
    type KeysServices,
    type KeysSpecialty,
    type KeysSpecialtyAnimals,
} from '~/constants'
import LOADING from '~/constants/loading'
import { useAppSelector } from '~/store/hooks'
import type { ActivateAccount } from '~/validations/activate'
import type { StepProps } from './types'

type ItemProps = {
    label: string
    value: string
    classNames?: {
        label?: string
        value?: string
    }
}

const Item = ({ label, value, classNames }: ItemProps) => (
    <li className="flex justify-between gap-1 p-1 text-xs font-semibold text-gray-500 mobile:w-full">
        <div className="flex flex-row items-center !justify-between flew-wrap text-start w-full ">
            <strong
                className={cn(
                    'mr-1 text-center text-gray-700 max-w-40 h-fit w-fit mobile:text-start',
                    classNames?.label,
                )}
            >
                {label}
            </strong>
            <span
                className={cn('max-w-36 h-fit mobile:text-end', classNames?.value)}
            >
                {value}
            </span>
        </div>
    </li>
)

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
        <section>
            <h4 className="my-2 font-sans text-base font-semibold text-center text-primary-600">
                Informações Básicas
            </h4>

            <ul className="flex flex-wrap justify-between w-full">
                <Item
                    label="Nome:"
                    value={`${values.firstName} ${values.lastName}`}
                    classNames={{ value: '!max-w-fit' }}
                />
                <Item label="CRMV:" value={values.crmv} />
                <Item label="Documento:" value={values.cpf_cnpj} />
                <Item label="Telefone:" value={values?.contact?.phone as string} />
                <Item
                    label="WhatsApp Comercial:"
                    value={values?.contact?.whatsapp as string}
                />
            </ul>

            <h4 className="my-2 font-sans text-base font-semibold text-center text-primary-600">
                Informações de Serviço
            </h4>
            <ul className="flex flex-wrap justify-between w-full">
                <Item
                    label="Especialidade:"
                    value={Specialty[values?.specialty as KeysSpecialty] as string}
                />
                <Item
                    label="Tipos de Atendimento:"
                    value={values?.types_service
                        ?.map((item) => Services[item as KeysServices])
                        ?.join(', ')}
                />
                <Item
                    label="Animais Atendidos:"
                    value={values?.list_service_type
                        ?.map(
                            (item) =>
                                SpecialtyAnimals[item as KeysSpecialtyAnimals],
                        )
                        .join(', ')}
                />
                <Item
                    label="Atendimento domiciliar:"
                    value={
                        values?.types_animals
                            ?.map((item?: string) => Pets[item as KeysPets])
                            ?.join(', ') || 'Não informado'
                    }
                />
                <Item
                    label="Outras Especialidades:"
                    value={
                        values?.list_specialty
                            ?.map((item) => Specialty[item as KeysSpecialty])
                            ?.join(', ') || 'Não informado'
                    }
                />
            </ul>

            <h4 className="mb-2 font-sans text-base font-semibold text-center text-primary-600">
                Endereço
            </h4>

            <ul className="flex flex-wrap justify-between w-full">
                <Item label="CEP:" value={values?.location?.zipCode as string} />
                <Item label="País:" value={values?.location?.country as string} />
                <Item label="Estado:" value={values?.location?.state as string} />
                <Item label="Cidade:" value={values?.location?.city as string} />
                <Item
                    label="Bairro:"
                    value={values?.location?.neighborhood as string}
                />
                <Item
                    label="Rua:"
                    value={values?.location?.street as string}
                    classNames={{ value: 'mobile:max-w-fit' }}
                />
                <Item label="Número:" value={values?.location?.number as string} />
                <Item
                    label="Complemento:"
                    value={values?.location?.complement || 'Não informado'}
                />
            </ul>

            <div className="flex items-center justify-center w-full gap-2 mt-2">
                <BtnNeutral
                    condition={!isLoading}
                    disabled={isLoading}
                    onClick={prevStep}
                    className="border-none"
                    label="Voltar"
                    outline
                />
                <BtnPrimary
                    isLoading={isLoading}
                    label="Cadastrar"
                    type="submit"
                    onClick={handleClick}
                    disabled={!isValid}
                />
            </div>
        </section>
    )
}

export default StepFinally
