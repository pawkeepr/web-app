import { BtnCancel, BtnLabel, BtnPrimary } from '~/Components/atoms/btn';
import withLoading from '~/Components/helpers/with-loading';
import CanceledScheduledModal from '~/Components/modals/canceled-scheduled-modal';

type BoxButtonsProps = {
    isLoading?: boolean;
}


const BoxButtons = ({
    isLoading = false,
}: BoxButtonsProps) => {
    return (
        <div className="gap-1 justify-end flex w-full mobile:grid mobile:grid-cols-1 flex-wrap">

            <CanceledScheduledModal>
                {
                    ({ showModal }) => (
                        <BtnLabel
                            condition={!isLoading}
                            label='Cancelar Consulta'
                            onClick={showModal.bind(null, true)}
                            className='text-red-500 border-none mobile:col-span-1'
                        />
                    )
                }
            </CanceledScheduledModal>

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