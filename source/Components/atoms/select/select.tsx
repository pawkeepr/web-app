import ReactSelect, { type Props } from 'react-select'
import { tv } from 'tailwind-variants'
import type { ModeInput } from '~/Components/molecules/field-control/field-control'

export type SelectProps = Props & {
    isSearchable?: boolean
    mode?: ModeInput
}

export const colorStyles = {
    multiValue: (styles: any, { data }: any) => {
        return {
            ...styles,
            backgroundColor: data.color,
            color: '#fff',
        }
    },
}

const control = tv({
    base: 'focus:!outline-none transition-shadow h-10 px-2 w-full focus:!border-0 dark:bg-[#292e33] dark:text-gray-200',
    variants: {
        required: {
            true: '!border-secondary-500 !border ',
            false: '!border !border-gray-300',
        },
        mode: {
            editable: '',
            readonly:
                'bg-transparent !border-none !pointer-events-none !focus:outline-none !text-gray-900',
        },
    },
})

const dropdownIndicator = tv({
    base: 'text-gray-400',
    variants: {
        mode: {
            editable: '',
            readonly: '!hidden',
        },
    },
})

const option = tv({
    base: 'py-2 hover:!bg-secondary-500 hover:text-neutral hover:cursor-pointer uppercase dark:bg-[#292e33] dark:text-gray-200 ',
    variants: {
        selected: {
            true: '!bg-primary-500',
            false: '',
        },
    },
})

const Select = ({
    isSearchable = true,
    mode = 'readonly',
    ...props
}: SelectProps) => {
    return (
        <ReactSelect
            placeholder={
                <div className="text-gray-400">
                    {props.placeholder || 'Selecione um opção'}
                </div>
            }
            delimiter=","
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary: '#09b285',
                },
            })}
            styles={colorStyles}
            isSearchable={isSearchable}
            menuPosition="fixed"
            classNames={{
                noOptionsMessage: () => 'Não há opções',
                control: () => control({ required: props.required, mode }),
                indicatorSeparator: () => '!hidden',
                option: (state) => option({ selected: state.isSelected }),
                dropdownIndicator: () => dropdownIndicator({ mode }),
            }}
            {...props}
        />
    )
}

export default Select
