import type { RefAttributes } from 'react'
import Popup from 'reactjs-popup'
import type { PopupActions, PopupProps } from 'reactjs-popup/dist/types'

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'

import { tv } from 'tailwind-variants'
import useKeyboardNavigation from '~/hooks/use-keyboard-navigation'

const modal = tv({
    base: `  
        relative
        z-50
        w-[80vw] flex flex-col 
        h-fit
        overflow-visible bg-gray-100 dark:bg-dark-500
        shadow-2xl rounded-md !py-0
    `,
    variants: {
        mobilePage: {
            true: 'mobile:!w-screen mobile:!h-screen mobile:rounded-none',
        },
    },
})

const Modal = ({
    className,
    mobilePage = true,
    ...props
}: JSX.IntrinsicAttributes &
    PopupProps &
    RefAttributes<PopupActions> & { mobilePage?: boolean }) => {
    useKeyboardNavigation({
        Escape: () => props.onClose?.(),
    })

    return (
        <Popup
            position="bottom center"
            className="mt-2"
            overlayStyle={{ background: 'rgba(0,0,0,0.6)' }}
            closeOnEscape={false}
            {...props}
        >
            <div className={modal({ className, mobilePage })}>
                <div className="h-8 bg-primary w-full relative flex justify-end mobile:justify-center">
                    <button
                        type="button"
                        className="!w-fit !p-0 !m-0  !h-fit "
                        onClick={() => props.onClose?.()}
                        aria-label="Close modal"
                    >
                        <XMarkIcon className="w-8 h-8 text-red-400 hover:!text-red-600 font-extrabold" />
                    </button>
                </div>

                <section className="mt-3 relative overflow-auto px-4 ">
                    {props.children}
                </section>
            </div>
        </Popup>
    )
}

export default Modal
