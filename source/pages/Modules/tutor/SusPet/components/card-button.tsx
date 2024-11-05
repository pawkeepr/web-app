import React from 'react'

type CardButtonProps = {
    record: {
        id: number
        type: string
        icon: JSX.Element
        iconBg: string
        textColor: string
        color: string
    }
    disabled?: boolean
    selectedIndex: number
    onChangeSelectedIndex: (index: number) => void
}

export const CardButton = ({
    record,
    onChangeSelectedIndex,
    disabled = false,
}: CardButtonProps) => {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => onChangeSelectedIndex(record.id)}
            className={`${record.color}  flex flex-col items-center px-2 py-[clamp(0.5rem,1rem,2rem)] bg-opacity-0 
            shadow-none rounded-lg hover:bg-opacity-100 transition-shadow duration-200 ease-in-out flex-grow`}
        >
            <div className={`${record.iconBg} p-4 rounded-full`}>
                {React.cloneElement(record.icon, {
                    className: `text-3xl ${record.textColor}`,
                })}
            </div>
            <span className="flex items-center justify-center h-12 text-xs font-bold text-center text-gray-600 ">
                {record.type}
            </span>
        </button>
    )
}
