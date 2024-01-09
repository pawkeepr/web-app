import React, { ReactNode } from 'react';
import Card from 'react-bootstrap/Card';

interface CardContainerProps {
    className?: string;
    children: ReactNode;
    title?: string;
}

const CardContainer: React.FC<CardContainerProps> = ({
    className,
    children,
    title,
}) => {
    return (
        <Card className={className}>
            <Card.Body>
                {title && (
                    <Card.Title className="mb-4 fw-normal">{title}</Card.Title>
                )}
                {children}
            </Card.Body>
        </Card>
    );
};

export default CardContainer;
