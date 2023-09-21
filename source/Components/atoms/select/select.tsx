import ReactSelect, { Props } from 'react-select';

import styles from './select.module.scss';

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
            className={styles.select}
            placeholder={<div className="text-gray-400">{props.placeholder || 'Clique aqui ...'}</div>}
            delimiter=','
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
                    '!border !border-gray-300 focus:outline-none transition-shadow',
                indicatorSeparator: () => '!hidden',
                input: () => 'focus:outline-none',

            }}
            {...props}
        />
    )
}

export default Select