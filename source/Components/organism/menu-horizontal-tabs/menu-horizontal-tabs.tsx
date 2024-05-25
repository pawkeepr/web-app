import cn from 'classnames'
import { useMemo } from 'react'
import { TiArrowBack, TiArrowForward } from 'react-icons/ti'
import { tv } from 'tailwind-variants'

const tab = tv({
    // Ajuste os estilos base e variantes conforme necessário
    base: `
        rounded-none 
        ring-white/60 ring-offset-2 focus:outline-none focus:ring-2
        leading-1 font-bold text-gray-500 bg-transparent
        text-sm flex web:flex-row items-center justify-center
        gap-1 flex-grow 
        transition-transform duration-300 ease-in-out
    `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        mobile: {
            true: 'mobile:flex-col mobile:text-xs mobile:h-20 mobile:!max-w-[80px]',
        },
        web: {
            true: 'web:py-2 web:!w-full',
        },
        selected: {
            true: 'text-primary-500 shadow transform scale-125',
        },
        disabled: {
            true: '!text-gray-600 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
        },
        menu: {
            true: 'mobile:mb-5',
        },
    },
    defaultVariants: {
        mobile: true,
        web: true,
    },
    compoundVariants: [
        {
            selected: true,
            menu: true,
            className: 'mobile:!rounded-full',
        },
    ],
})

const menu = tv({
    base: `
        p-0  w-full
        mobile:bg-[#f6dda3] mobile:rounded-t-full mobile:shadow-md mobile:h-16 mobile:overflow-visible 
        web:bg-white
        web:rounded-md
        flex items-center justify-center overflow-hidden
        transition-transform duration-300 ease-in-out
    `,
    variants: {
        hidden: {
            true: 'hidden',
            false: 'flex flex-row',
        },
        bottomNavigation: {
            true: 'mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 mobile:z-10',
            false: '',
        },
        transform: {
            true: 'translate-x-[-25%]',
            false: 'translate-x-0',
        },
    },
    defaultVariants: {
        bottomNavigation: true,
    },
})

export type ItemTab = {
    id: number
    title: string
    href: string
}

type MenuHorizontalTabsProps = {
    items: ItemTab[]
    onClick: (id: ItemTab) => void
    activeItem: number
}

function selectMiddle(arr: ItemTab[], newMiddle: ItemTab) {
    const middleIndex = arr.findIndex((i) => i.id === newMiddle.id)
    // criar um array vazio com o tamanho do array original
    const auxArr = Array.from({ length: arr.length })

    if (middleIndex === -1) {
        throw new Error('Element not found in the array')
    }

    const middle = Math.floor(arr.length / 2)

    if (arr.length < 3) {
        return arr
    }

    let i = 0
    const index = arr.findIndex((i) => i.id === newMiddle.id)

    do {
        const indexElement = (index + i) % arr.length
        const indexAux = (middle + i) % arr.length
        auxArr[indexAux] = arr[indexElement]
        i++
    } while (i < arr.length)

    return auxArr
}

const MenuHorizontalTabs = ({
    items,
    onClick,
    activeItem,
}: MenuHorizontalTabsProps) => {
    const itemsMenu = useMemo(() => {
        const index = items.findIndex((i) => i.id === activeItem)
        if (items.length < 3) {
            return items
        }

        return selectMiddle(items, items[index]) as ItemTab[]
    }, [items, activeItem])

    const middle = Math.floor(itemsMenu.length / 2)

    const handleNext = () => {
        const index = items.findIndex((i) => i.id === activeItem)
        const newIndex = (index + 1) % items.length
        selectMiddle(items, items[newIndex])
        onClick(items[newIndex])
    }

    const handlePrev = () => {
        const index = items.findIndex((i) => i.id === activeItem)
        const newIndex = (index - 1 + items.length) % items.length
        selectMiddle(items, items[newIndex])
        onClick(items[newIndex])
    }

    return (
        <div className="flex flex-row w-100">
            <div className="flex items-center justify-center flex-grow w-1/5">
                <button type="button" onClick={handlePrev}>
                    <TiArrowForward className="w-5 h-5 transform rotate-[240deg] text-primary-500 " />
                </button>
            </div>
            <div
                className={menu({
                    bottomNavigation: true,
                })}
            >
                {itemsMenu.map((item, index) => {
                    const min = middle - 1
                    const max = middle + 1

                    return (
                        <div
                            key={item.id}
                            className={cn(
                                'flex items-center justify-center flex-grow w-1/5 transition-transform',
                                {
                                    hidden: index < min || index > max,
                                },
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    onClick(item)
                                    selectMiddle(items, item)
                                }}
                                id="steparrow-gen-info-tab"
                                className={tab({
                                    selected: middle === index,
                                    menu: true,
                                })}
                            >
                                {item.title}
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className="flex items-center justify-center flex-grow w-1/5">
                <button type="button" onClick={handleNext}>
                    <TiArrowBack className="w-5 h-5 transform rotate-[110deg] text-primary-500" />
                </button>
            </div>
        </div>
    )
}

export default MenuHorizontalTabs
