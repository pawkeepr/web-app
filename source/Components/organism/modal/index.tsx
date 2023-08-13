import { RefAttributes } from 'react'
import Popup from 'reactjs-popup'
import { PopupActions, PopupProps } from 'reactjs-popup/dist/types'

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
                z-50
                dark:bg-dark-500
                popup-content
                max-h-[95vh] w-[800px] flex flex-col overflow-y-auto
                mobile:!w-full
	            overflow-x-hidden px-4 py-8 bg-white
	            shadow-2xl rounded-md
                `,
                className
            )}
        >
            {props.children}
        </div>
    </Popup>
)

export default Modal
