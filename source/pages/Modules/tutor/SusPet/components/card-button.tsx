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
            className={`${record.color} flex flex-col items-center px-4 py-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-200 ease-in-out grow-0  w-[160px] `}
        >
            <div className={`${record.iconBg} p-4 rounded-full mb-2`}>
                {React.cloneElement(record.icon, {
                    className: `text-4xl ${record.textColor}`,
                })}
            </div>
            <span className="flex items-center justify-center h-16 text-base font-semibold text-center text-gray-700 ">
                {record.type}
            </span>
        </button>
    )
}
