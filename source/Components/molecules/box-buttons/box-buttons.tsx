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
        <div className="hstack gap-2 justify-content-end">
            {visibleCancel &&
                <BtnCancel
                    label={labelCancel}
                    onClick={onClickCancel}
                />
            }
            {
                visibleSuccess &&
                <BtnPrimary
                    link={link}
                    onClick={onClickSuccess}
                    disabled={!isValid}
                    type={type}
                    id="add-btn"
                    label={labelSuccess}
                />
            }
        </div>
    )
}

export default BoxButtons