import { ptBR } from 'date-fns/locale/pt-BR';
import { forwardRef, useState, type ComponentProps } from 'react';
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { tv } from 'tailwind-variants';

type InputDateProps = {
    isValid?: boolean
    onChange?: (date: Date) => void
    selected?: Date | null
} & ReactDatePickerProps

export const input = tv({
    base: `
        flex w-full pl-2 pr-4 py-2 rounded-sm gap-2
        disabled:opacity-70 text-gray-600 disabled:bg-gray-200
        transition-all duration-100 ease-in-out
        opacity-90 hover:opacity-100 text-sm
        transition-shadow font-sans  h-10 border outline-primary
        outline-primary items-center justify-center bg-white
        active:!bg-gray-200 
    `,
    variants: {
        required: {
            true: '!border-secondary-500',
        },
        isValid: {
            true: '!border-primary-500',
        },
        center: {
            true: '!text-center',
        },
    },
})

// props de button

const InputDate = ({ selected = null, onChange, ...props }: InputDateProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(selected)

    const ExampleCustomInput = forwardRef(
        <T,>({ value, onClick }: ComponentProps<'button'>, ref) => (
            <button className={input()} onClick={onClick} ref={ref}>
                <FaRegCalendarAlt className="text-gray-600" />
                {value}
            </button>
        ),
    )

    const onChangeSelectedDate = (date: Date) => {
        onChange?.(date)
        setSelectedDate(date)
    }

    return (
        <ReactDatePicker
            {...props}
            withPortal
            locale={ptBR}
            showTimeSelect
            dateFormat="Pp"
            onChange={onChangeSelectedDate}
            selected={selectedDate}
            customInput={<ExampleCustomInput />}
        />
    )
}

export default InputDate
