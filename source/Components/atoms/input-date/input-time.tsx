import { ptBR } from 'date-fns/locale/pt-BR'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { InputLabelDate, type InputDateProps } from './input-date'
// props de button

type InputTimeProps = {
    timeIntervals: number
    timeCaption: string
    dateFormat: string
    showTimeSelect: true
    showTimeSelectOnly: true
} & InputDateProps

const InputTime = ({
    selected = null,
    onChange,
    timeIntervals = 0,
    timeCaption = 'Time',
    dateFormat = 'h:mm aa',
    placeholderText = 'Selecione uma hora',
    ...props
}: InputTimeProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(selected)

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
            placeholderText={placeholderText}
            showTimeSelectOnly
            timeIntervals={timeIntervals}
            timeCaption={timeCaption}
            dateFormat={dateFormat}
            onChange={onChangeSelectedDate}
            selected={selectedDate}
            customInput={<InputLabelDate />}
        />
    )
}

export default InputTime
