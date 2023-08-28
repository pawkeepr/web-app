import { BtnCancel, BtnPrimary } from '~/Components/atoms/btn'

type BoxButtonsProps = {
    onClickCancel: () => void
    onClickSuccess: () => void
    isValid?: boolean
    type?: 'button' | 'submit'
    labelCancel?: string
    labelSuccess?: string
    link?: boolean
    visibleSuccess?: boolean
    visibleCancel?: boolean
}

const BoxButtons = ({
    onClickCancel,
    onClickSuccess,
    link = true,
    type = 'submit',
    labelCancel = 'Cancelar',
    labelSuccess = 'Adicionar',
    isValid = false,
    visibleCancel = true,
    visibleSuccess = true,
}: BoxButtonsProps) => {
    return (
        <div className="gap-2 justify-end flex w-full">
            {visibleCancel &&
                <BtnCancel
                    label={labelCancel}
                    onClick={onClickCancel}
                    className='bg-secondary border-2 border-secondary text-white hover:bg-primary hover:text-white !w-44'
                />
            }
            {
                visibleSuccess &&
                <BtnPrimary
                    link={link}
                    onClick={onClickSuccess}
                    disabled={!isValid}
                    className='!w-44 text-white'
                    type={type}
                    id="add-btn"
                    label={labelSuccess}
                />
            }
        </div>
    )
}

export default BoxButtons