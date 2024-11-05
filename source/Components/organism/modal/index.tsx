import cn from 'classnames'
import {
    Modal as ModalResponsive,
    type ModalProps as ModalResponsiveProps,
} from 'react-responsive-modal'
import { tv } from 'tailwind-variants'
import useKeyboardNavigation from '~/hooks/use-keyboard-navigation'

const modal = tv({
    base: `  
        relative
        rounded-2xl min-w-[400px] min-h-[300px]
        scroll-1 scrollbar !scrollbar-thumb-primary !scrollbar-track-neutral !scrollbar-rounded-full
    `,
    variants: {
        mobilePage: {
            true: 'mobile:!w-screen mobile:!h-screen mobile:!rounded-none mobile:!py-1 mobile:!m-0',
        },
    },
})

type ModalProps = {
    open?: boolean
    onClose?: () => void
    children?: React.ReactNode
    mobilePage?: boolean
} & ModalResponsiveProps

const Modal = ({ mobilePage = true, classNames, ...props }: ModalProps) => {
    useKeyboardNavigation({
        Escape: () => props.onClose?.(),
    })

    return (
        <ModalResponsive
            {...props}
            onEscKeyDown={props.onClose}
            closeOnOverlayClick
            container={document?.body}
            center
            classNames={{
                ...classNames,
                modal: cn(
                    classNames?.modal,
                    modal({
                        mobilePage,
                    }),
                ),

                modalContainer: `
                  ${classNames?.modalContainer}
           `,
            }}
        >
            {props.children}
        </ModalResponsive>
    )
}

export default Modal
