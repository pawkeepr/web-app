import { RefAttributes } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions, PopupProps } from 'reactjs-popup/dist/types'

import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'

import { twMerge } from 'tailwind-merge'

const Modal = ({
    className,
    ...props
}: JSX.IntrinsicAttributes &
    PopupProps &
    RefAttributes<PopupActions> & { maxHeight?: number; width?: number }) => (
    <Popup
        position="bottom center"
        className='mt-2'
        overlayStyle={{ background: 'rgba(0,0,0,0.1)' }} closeOnEscape={false} {...props}>
        <div
            className={twMerge(`
                relative
                z-50
                popup-content
                w-[800px] flex flex-col 
                h-fit
                mobile:!w-screen mobile:!h-screen mobile:rounded-none 
	            overflow-auto px-4 py-10 bg-gray-100 dark:bg-dark-500
	            shadow-2xl rounded-md
                `,
                className
            )}
        >
            <button
                className="absolute top-4 right-4"
                onClick={() => props.onClose?.()}
                aria-label="Close modal">
                <XMarkIcon className="w-8 h-8 text-gray-800 font-extrabold" />
            </button>
            {props.children}
        </div>
    </Popup>
)

export default Modal
