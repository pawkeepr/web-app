import { tv } from 'tailwind-variants'

const menu = tv({
    base: `
        flex flex-row justify-center
        mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0
        mobile:p-0 
        h-fit z-[100] bg-white mobile:border-t-2 border-primary-500
        nav-pills nav-justified
    `,
})

const tab = tv({
    // Ajuste os estilos base e variantes conforme necessário
    base: `
        w-full flex-1 mobile:!py-4 py-2
        font-bold text-gray-600
        mobile:text-xs
        border border-secondary-500
        text-sm flex web:flex-row items-center justify-center
        mobile:flex-col gap-2 !rounded-none
        mobile:border  hover:bg-gray-100 
        `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        selected: {
            true: '!bg-secondary-500 !text-gray-600 shadow',
        },
        disabled: {
            true: '!text-gray-600 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
        },
    },
})

type ItemTab = {
    id: number
    title: string
    href: string
}
type MenuHorizontalTabsProps = {
    items: ItemTab[]
    onClick: (id: ItemTab) => void
    activeIndex: number
}

const MenuHorizontalTabs = ({
    items,
    onClick,
    activeIndex,
}: MenuHorizontalTabsProps) => {
    return (
        <div className={menu()}>
            {items.map((item) => {
                return (
                    <button
                        key={item.id}
                        type="button"
                        // href={item.href}
                        onClick={() => onClick(item)}
                        id="steparrow-gen-info-tab"
                        className={tab({
                            selected: activeIndex === item.id,
                        })}
                    >
                        {item.title}
                    </button>
                )
            })}
        </div>
    )
}

export default MenuHorizontalTabs
