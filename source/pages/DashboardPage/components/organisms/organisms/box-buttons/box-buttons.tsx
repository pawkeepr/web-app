import { BtnCancel, BtnLabel, BtnPrimary } from '~/Components/atoms/btn';
import withLoading from '~/Components/helpers/with-loading';
import { ModalPlus, usePlusModal } from '~/hooks/use-plus-modal';
import { IAppointmentVet } from '~/store/slices/appointment-vet/types';

type BoxButtonsProps = {
    isLoading?: boolean;
    item: IAppointmentVet;
}


const BoxButtons = ({
    isLoading = false,
    item,
}: BoxButtonsProps) => {
    const { setItem, open } = usePlusModal();

    const onClickCancel = () => {
        setItem(item);
        open(ModalPlus.CanceledScheduled)
    }

    return (
        <div className="gap-1 justify-end flex w-full mobile:grid mobile:grid-cols-1 flex-wrap">

            <BtnLabel
                condition={!isLoading}
                label='Cancelar Consulta'
                onClick={onClickCancel}
                className='text-red-500 border-none mobile:col-span-1'
            />

            <BtnCancel
                condition={!isLoading}
                label='Reagendar Consulta'
                onClick={() => { }}
                className='border-none mobile:!w-full mobile:col-span-1'
            />

            <BtnPrimary
                label='Iniciar Consulta'
                className='border-none mobile:!w-full mobile:col-span-1'
                onClick={() => { }}
            />

        </div>
    )
}

export default withLoading(BoxButtons)