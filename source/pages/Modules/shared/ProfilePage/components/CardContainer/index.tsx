import type React from 'react'
import type { ReactNode } from 'react'
import { cn } from '~/ui/lib/utils'

interface CardContainerProps {
    className?: string
    children: ReactNode
    title?: string
}

const CardContainer: React.FC<CardContainerProps> = ({
    className,
    children,
    title,
}) => {
    return (
        <div className={cn('card', className)}>
            <div className="card-body">
                {title && <h1 className="mb-4 card-title fw-normal">{title}</h1>}
                {children}
            </div>
        </div>
    )
}

export default CardContainer
