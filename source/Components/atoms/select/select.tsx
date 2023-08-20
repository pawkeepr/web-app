import ReactSelect, { Props } from 'react-select';

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

const Select = (props: Props) => {
    return (
        <ReactSelect
            {...props}
            placeholder={<div className="text-gray-400">{props.placeholder || 'Clique aqui ...'}</div>}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: 'rgb(9, 178, 133);',
                    primary: 'rgb(9, 178, 133);',
                },
            })}
            styles={colorStyles}
            isSearchable={true}
            classNames={{
                noOptionsMessage: () => 'Não há opções',
                control: () =>
                    '!rounded-md border !border-gray-300 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-shadow',
                option: (state) =>
                    `${state.isSelected && '!bg-btn-blue-500'
                    } !py-1 hover:bg-btn-blue-50 hover:cursor-pointer`,
                indicatorSeparator: () => '!hidden',
            }}
        />
    )
}

export default Select