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
    children?: React.ReactNode
    mobilePage?: boolean
} & ModalResponsiveProps

const Modal = ({ mobilePage = true, ...props }: ModalProps) => {
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
                modal: modal({
                    className: props.classNames?.modal,
                    mobilePage,
                }),
                modalContainer:
                    'mobile:flex mobile:flex-1 mobile:justify-center mobile:items-center',
                root: 'mobile:bg-primary-500 mobile:bg-opacity-60',
                ...props.classNames,
            }}
        >
            {props.children}
        </ModalResponsive>
    )
}

export default Modal
