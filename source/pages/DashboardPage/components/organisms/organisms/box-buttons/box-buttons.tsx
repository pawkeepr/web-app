import { BtnCancel, BtnLabel, BtnPrimary } from '~/Components/atoms/btn';
import withLoading from '~/Components/helpers/with-loading';

type BoxButtonsProps = {
    isLoading?: boolean;
}


const BoxButtons = ({
    isLoading = false,
}: BoxButtonsProps) => {
    return (
        <div className="gap-2 justify-center flex w-full">
            <BtnLabel condition={!isLoading} label={'Cancelar Consulta'} onClick={() => { }} className='text-gray-600' />
            <BtnCancel condition={!isLoading} label={'Reagendar Consulta'} onClick={() => { }} className='text-white' />
            <BtnPrimary label={'Iniciar Consulta'} onClick={() => { }} />
        </div>
    )
}

export default withLoading(BoxButtons)