import ReactSelect, { Props } from 'react-select';

import cn from 'classnames';

export type SelectProps = Props


export const colorStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
    option: (styles: any, { data }: any) => {
        return { ...styles, color: 'black' };
    },
    multiValue: (styles: any, { data }: any) => {
        return {
            ...styles,
            backgroundColor: data.color,
            color: "#fff",
        };
    },
    multiValueLabel: (styles: any) => {
        return {
            ...styles,
            color: "#0b0909",
        };
    },
    multiValueRemove: (styles: any) => {
        return {
            ...styles,
            color: "#fff",
            cursor: "pointer",
            ":hover": {
                color: "#fff",
            },

        };
    },
};

const Select = ({
    isSearchable = false,
    ...props
}: Props) => {
    return (
        <ReactSelect
            placeholder={<div className="text-gray-400">{props.placeholder || 'Clique aqui ...'}</div>}
            delimiter=','
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                },
            })}
            styles={colorStyles}
            isSearchable={isSearchable}
            menuPosition='fixed'
            classNames={{

                noOptionsMessage: () => 'Não há opções',
                control: () => cn(
                    'focus:outline-none transition-shadow h-10',
                    {
                        '!border-secondary-500 !border ': props.required,
                        '!border !border-gray-300': !props.required,
                    }),
                indicatorSeparator: () => '!hidden',
                input: () => 'focus:outline-none',
                option: (state) => cn(
                    "py-2 hover:bg-secondary-500 hover:text-neutral hover:cursor-pointer uppercase",
                    {
                        '!bg-primary-500': state.isSelected,
                    }
                ),

            }}
            {...props}
        />
    )
}

export default Select