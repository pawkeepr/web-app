import { useId } from 'react'
import { tv } from 'tailwind-variants'
import useResizeMobile from '~/hooks/use-resize-mobile'

export const card = tv({
    base: `
        card card-side shadow-xl w-full justify-start items-center text-left
        bg-white rounded-3xl !h-fit max-h-[232px] overflow-hidden
    `,
    variants: {
        mobile: {
            true: 'mobile:rounded-3xl',
        },
        isMobile: {
            true: 'hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer',
        },
        selected: {
            true: '!border-2 !border-secondary-500',
            false: 'border border-gray-200',
        },
    },
    defaultVariants: {
        mobile: true,
    },
})

export type ModalBoxButtonsProps<T> = {
    item: T
    children: (props: { showModal: () => void }) => JSX.Element
}

type CardProps<T> = {
    item: T
    sectionAvatar: () => JSX.Element
    children: JSX.Element
    boxButtons: (props: { item: T }) => JSX.Element
    modal: (props: ModalBoxButtonsProps<T>) => JSX.Element
    className?: string
}

const Card = <T,>({
    item,
    boxButtons: BoxButtons,
    modal: ModalBoxButtons,
    sectionAvatar: Avatar,
    children,
    className,
}: CardProps<T>) => {
    const id = useId()
    const { isMobile } = useResizeMobile()

    return (
        <ModalBoxButtons item={item}>
            {({ showModal }) => (
                <div
                    key={(item as any)?.id || id}
                    onClick={() => {
                        if (isMobile) {
                            showModal()
                        }
                    }}
                    onKeyUp={() => {}}
                    style={{
                        cursor: isMobile ? 'pointer' : 'default',
                        outline: 'none',
                    }}
                    className={card({
                        isMobile,
                        className,
                    })}
                >
                    <div className="flex-[2] flex-col items-center justify-center flex">
                        <Avatar />
                    </div>

                    <div className="card-body mobile:text-xs text-sm mobile:py-4 px-0 m-0 flex-[3] font-sans">
                        {children}
                        <div className="card-actions mobile:hidden">
                            {BoxButtons && <BoxButtons item={item} />}
                        </div>
                    </div>
                </div>
            )}
        </ModalBoxButtons>
    )
}

export default Card
