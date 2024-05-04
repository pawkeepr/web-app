import {
    Modal as ModalResponsive,
    type ModalProps as ModalResponsiveProps,
} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { tv } from 'tailwind-variants'
import useKeyboardNavigation from '~/hooks/use-keyboard-navigation'

const modal = tv({
    base: `  
        relative
        rounded-md
        bg-green-500
    `,
    variants: {
        mobilePage: {
            true: 'mobile:!w-screen mobile:!h-screen mobile:!rounded-none mobile:!p-2 mobile:!m-0',
        },
    },
})

type ModalProps = {
    open?: boolean
    onClose?: () => void
    className?: string
    children?: React.ReactNode
    mobilePage?: boolean
} & ModalResponsiveProps

const Modal = ({ className, mobilePage = true, ...props }: ModalProps) => {
    useKeyboardNavigation({
        Escape: () => props.onClose?.(),
    })

    return (
        <ModalResponsive
            {...props}
            onEscKeyDown={props.onClose}
            closeOnOverlayClick
            center
            classNames={{
                modal: modal({ className, mobilePage }),
            }}
        >
                {props.children}
        </ModalResponsive>
    )
}

export default Modal
