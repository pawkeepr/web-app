import { twMerge } from 'tailwind-merge'
import { BtnCancel, BtnPrimary, type BtnProps } from '~/Components/atoms/btn'
import withLoading from '~/Components/helpers/with-loading'
type Fn = () => void

type hasBtnCancel =
    | {
          onClickCancel?: Fn
          cancel?: (props: BtnProps) => JSX.Element
      }
    | {
          cancel: null
          onClickCancel?: null
      }

type hasBtnSuccess =
    | {
          onClickSuccess: Fn
          success?: (props: BtnProps) => JSX.Element
      }
    | {
          success: null
          onClickSuccess?: null
      }

type BoxButtonsProps = {
    type?: 'button' | 'submit'
    isValid?: boolean
    link?: boolean
    className?: string
    isLoading?: boolean
} & hasBtnCancel &
    hasBtnSuccess

const BoxButtons = ({
    onClickCancel,
    onClickSuccess,
    isLoading = false,
    link = true,
    type = 'submit',
    cancel = ({ label = 'Voltar', onClick, isLoading, ...props }) => (
        <BtnCancel
            outline
            condition={!isLoading}
            className="border-none"
            label={label}
            onClick={onClick}
            {...props}
        />
    ),
    success = ({ label = 'Prosseguir', onClick, disabled, ...props }) => (
        <BtnPrimary
            label={label}
            onClick={onClick}
            disabled={disabled}
            {...props}
        />
    ),
    isValid = false,
    className,
}: BoxButtonsProps) => {
    return (
        <div className={twMerge('gap-1 justify-center flex w-full ', className)}>
            {cancel?.({ onClick: onClickCancel as Fn, isLoading })}

            {success?.({
                onClick: onClickSuccess as Fn,
                disabled: !isValid,
                type,
                link,
                isLoading,
            })}
        </div>
    )
}

export default withLoading(BoxButtons)
