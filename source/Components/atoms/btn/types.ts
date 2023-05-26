export type BtnProps = {
    onClick?: (e?: any) => void
    label?: string
    link?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>