type AccordionProps = {
    title: any
    children: React.ReactNode
}
const Accordion = ({ children, title }: AccordionProps) => {
    return (
        // biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
        <details tabIndex={0} className="w-full collapse collapse-arrow">
            <summary className="w-full cursor-pointer collapse-title">
                <span>{title}</span>
            </summary>
            <div className="collapse-content">{children}</div>
        </details>
    )
}

export default Accordion
