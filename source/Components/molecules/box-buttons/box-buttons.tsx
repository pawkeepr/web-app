import { BtnCancel, BtnSuccess } from '~/Components/atoms/btn'

type BoxButtonsProps = {
    onClickCancel: () => void
    onClickSuccess: () => void
    isValid?: boolean
}

const BoxButtons = ({ onClickCancel, onClickSuccess, isValid = false }: BoxButtonsProps) => {
    return (
        <div className="hstack gap-2 justify-content-end">
            <BtnCancel
                onClick={onClickCancel}
            />
            <BtnSuccess
                link
                onClick={onClickSuccess}
                disabled={!isValid}
                type="submit"
                id="add-btn"
                label="Adicionar"
            />
        </div>
    )
}

export default BoxButtons