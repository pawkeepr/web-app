import { tv } from 'tailwind-variants';

import { twMerge } from 'tailwind-merge';

const alert = tv({
    base: 'rounded-md p-4 text-center',
    variants: {
        color: {
            success: 'bg-green-50 border-green-400 text-green-700',
            danger: 'bg-red-50 border-red-400 text-red-700',
            warning: 'bg-yellow-50 border-yellow-400 text-yellow-700',
            info: 'bg-blue-50 border-blue-400 text-blue-700',
        },
    },
});

type AlertProps = {
    children: React.ReactNode;
    className?: string;
    color?: 'success' | 'danger' | 'warning' | 'info';
};

const Alert = ({ children, className, ...props }: AlertProps) => {
    return (
        <div className={twMerge(alert({ ...props }), className)}>
            {children}
        </div>
    );
};

export default Alert;
