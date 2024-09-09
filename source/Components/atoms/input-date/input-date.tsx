import { ArrowLeftIcon, CalendarIcon } from '@heroicons/react/24/solid'
import { getMonth, getYear } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { range } from 'lodash'
import { forwardRef, useState, type ComponentProps } from 'react'
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker'

import { input } from '../input'

export type InputDateProps = {
    isValid?: boolean
    onChange?: (date: Date) => void
    selected?: Date | null
} & ReactDatePickerProps

// props de button

export const InputLabelDate = forwardRef(
    ({ value, onClick, ...props }: ComponentProps<'button'>, ref) => {
        const placeholder = props['aria-placeholder'] || 'Selecione uma data'
        return (
            <button
                {...props}
                type="button"
                className={input({
                    className: 'relative text-left justify-start px-4 ',
                })}
                onClick={onClick}
                ref={ref}
            >
                {value || placeholder}
                <CalendarIcon className="absolute top-0 w-6 h-6 text-gray-500 translate-y-[40%] right-4" />
            </button>
        )
    },
)

const InputDate = ({
    selected = null,
    onChange,
    placeholderText,
    ...props
}: InputDateProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(selected)
    const years = range(1990, getYear(new Date()) + 1, 1)
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ]

    const onChangeSelectedDate = (date: Date) => {
        onChange?.(date)
        setSelectedDate(date)
    }

    return (
        <ReactDatePicker
            {...props}
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div className="flex items-center justify-between mb-2">
                    <button
                        type="button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                    </button>
                    <select
                        className="px-2 bg-white rounded-lg h-11 scroll "
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        className="px-2 bg-white rounded-lg h-11"
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                            <option key={option} value={option} className="p-4">
                                {option}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                    >
                        <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                    </button>
                </div>
            )}
            locale={ptBR}
            // portalId="body"
            // withPortal
            onChange={onChangeSelectedDate}
            selected={selectedDate}
            customInput={<InputLabelDate aria-placeholder={placeholderText} />}
        />
    )
}

export default InputDate
