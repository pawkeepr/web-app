import { twMerge } from 'tailwind-merge'

type AccordionProps = {
    title: any
    children: React.ReactNode
    classNames?: {
        title?: string
        content?: string
    }
}

const Accordion = ({ children, title, classNames = {} }: AccordionProps) => {
    return (
        // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
        <details tabIndex={0} className="w-full collapse collapse-arrow">
            <summary className="w-full cursor-pointer collapse-title">
                <span className={classNames?.title}>{title}</span>
            </summary>
            <div className={twMerge('collapse-content', classNames?.content)}>
                {children}
            </div>
        </details>
    )
}

export default Accordion
