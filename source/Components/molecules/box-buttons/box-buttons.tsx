import { BtnCancel, BtnPrimary, BtnProps } from '~/Components/atoms/btn';
import withLoading from '~/Components/helpers/with-loading';

type Fn = () => void;

type hasBtnCancel = {
    onClickCancel?: Fn;
    cancel?: (props: BtnProps) => JSX.Element;
} | {
    cancel: null;
    onClickCancel?: null;
}

type hasBtnSuccess = {
    onClickSuccess: Fn;
    success?: (props: BtnProps) => JSX.Element;
} | {
    success: null;
    onClickSuccess?: null;
}

type BoxButtonsProps = {
    type?: 'button' | 'submit';
    isValid?: boolean;
    link?: boolean;
} & hasBtnCancel & hasBtnSuccess;



const BoxButtons = ({
    onClickCancel,
    onClickSuccess,
    link = true,
    type = 'submit',
    cancel = ({
        label = 'Voltar',
        onClick,
        ...props
    }) => <BtnCancel label={label} onClick={onClick} {...props} />,
    success = ({
        label = 'Prosseguir',
        onClick,
        disabled,
        ...props
    }) => <BtnPrimary label={label} onClick={onClick} disabled={disabled}  {...props} />,
    isValid = false,
}: BoxButtonsProps) => {
    return (
        <div className="gap-2 justify-center flex w-full">
            {cancel?.({ onClick: onClickCancel as Fn })}


            {success?.({
                onClick: onClickSuccess as Fn,
                disabled: !isValid,
                type,
                link
            })}

        </div>
    )
}

export default withLoading(BoxButtons)