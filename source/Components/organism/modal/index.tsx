import type { RefAttributes } from 'react'
import Popup from 'reactjs-popup'
import type { PopupActions, PopupProps } from 'reactjs-popup/dist/types'

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'

import { twMerge } from 'tailwind-merge'
import { BtnIcon } from '~/Components/atoms/btn'
import useKeyboardNavigation from '~/hooks/use-keyboard-navigation'

const Modal = ({
    className,
    ...props
}: JSX.IntrinsicAttributes &
    PopupProps &
    RefAttributes<PopupActions> & { maxHeight?: number; width?: number }) => {
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
            <div
                className={twMerge(
                    `
                relative
                z-50
                popup-content
                w-[80vw] flex flex-col 
                h-fit
                mobile:!w-screen mobile:!h-screen mobile:rounded-none 
	            overflow-visible  py-10 bg-gray-100 dark:bg-dark-500
	            shadow-2xl rounded-md
                `,
                    className,
                )}
            >
                <div className="h-4 p-3 bg-primary absolute top-0 w-full right-0" />

                <BtnIcon
                    type="button"
                    icon={
                        <XMarkIcon className="w-8 h-8 text-gray-500 hover:!text-red-600 font-extrabold" />
                    }
                    className="absolute top-1 right-0 w-fit p-0 ! py-0 h-fit "
                    onClick={() => props.onClose?.()}
                    aria-label="Close modal"
                />

                <section className="mt-3 relative overflow-auto px-4 ">
                    {props.children}
                </section>
            </div>
        </Popup>
    )
}

export default Modal
