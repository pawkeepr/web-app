import { cloneDeep } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { TiArrowBack, TiArrowForward } from 'react-icons/ti'
import { tv } from 'tailwind-variants'
import useResizeMobile from '~/hooks/use-resize-mobile'
import Dots from './dots'

const tab = tv({
    base: `
        flex items-center justify-center flex-grow w-1/3 transition-transform
        bg-transparent h-full
    `,
    variants: {
        selected: {
            true: 'text-primary-500',
        },
        hidden: {
            true: 'mobile:hidden',
        },
    },
})

const buttonTab = tv({
    // Ajuste os estilos base e variantes conforme necessário
    base: `
        rounded-none 
        focus:outline-none focus:ring-0
        web:h-12 
        font-bold text-gray-500 py-2
        text-sm flex web:flex-row items-center justify-center
        gap-1 flex-grow 
        transition-transform duration-300 ease-in-out
    `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        mobile: {
            true: 'mobile:flex-col mobile:text-xs mobile:h-[88px] mobile:!max-w-[88px] ',
        },
        web: {
            true: 'web:py-2 web:!w-full',
        },
        selected: {
            true: 'text-gray-100 bg-primary-500  shadow-2xl  mobile:translate-y-[-25%] transform mobile:scale-105 ',
            false: '',
        },
        disabled: {
            true: '!text-gray-600 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
        },
    },
    defaultVariants: {
        mobile: true,
        web: true,
    },
    compoundVariants: [
        {
            selected: true,
            className: 'mobile:!rounded-full',
        },
    ],
})

const menu = tv({
    base: `
        relative
        w-full 
        mobile:bg-[#f6dda3] mobile:rounded-t-full shadow-2xl mobile:h-16 mobile:!overflow-visible 
        web:bg-white
        web:rounded-md
        flex items-center justify-center overflow-hidden
        transition-transform duration-500 ease-in-out
    `,
    variants: {
        hidden: {
            true: 'hidden',
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
    activeItem: ItemTab
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
    const { isMobile } = useResizeMobile()
    const middle = Math.floor(items.length / 2)
    const [currentIndex, setCurrentIndex] = useState(isMobile ? middle : 0)

    const itemsMenu = useMemo(() => {
        if (!isMobile) return items

        const index = items.findIndex((i) => i.id === activeItem.id)
        if (items.length < 3) {
            return items
        }

        return selectMiddle(items, items[index]) as ItemTab[]
    }, [items, isMobile])

    useEffect(() => {
        if (!isMobile) return
        const index = itemsMenu.findIndex((i) => i.id === activeItem.id)
        setCurrentIndex(index)
    }, [activeItem, itemsMenu])

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
        const index = items.findIndex((i) => i.id === activeItem.id)
        const newIndex = (index + 1) % items.length
        isMobile && selectMiddle(items, items[newIndex])
        onClick(items[newIndex])
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1,
        )
        const index = items.findIndex((i) => i.id === activeItem.id)
        const newIndex = (index - 1 + items.length) % items.length
        isMobile && selectMiddle(items, items[newIndex])
        onClick(items[newIndex])
    }

    const visibleItems = useMemo(() => {
        if (!isMobile) return itemsMenu
        const cpItems = cloneDeep(itemsMenu)
        return cpItems.concat(cpItems)
    }, [isMobile, itemsMenu])

    return (
        <>
            <div className="w-full web:hidden">
                <Dots
                    total={items.length}
                    activeIndex={items.findIndex((i) => i.id === activeItem.id)}
                />
            </div>
            <div
                className={menu({
                    bottomNavigation: true,
                })}
            >
                <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute z-10 left-1 web:hidden "
                >
                    <TiArrowForward className="w-5 h-5 transform rotate-[240deg] text-primary-500 " />
                </button>
                <div className="w-full">
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${
                                isMobile
                                    ? (100 / 3) *
                                      ((currentIndex - 1) % items.length)
                                    : 0
                            }%)`,
                        }}
                    >
                        {visibleItems.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className={tab({
                                        selected: activeItem.id === item.id,
                                        className:
                                            'mobile:flex-shrink-0 mobile:w-1/3',
                                    })}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (item.id === activeItem.id) return
                                            // getDirection(activeItem, item)
                                            onClick(item)
                                            selectMiddle(items, item)
                                        }}
                                        className={buttonTab({
                                            selected: activeItem.id === item.id,
                                        })}
                                    >
                                        {item.title}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-1 web:hidden"
                >
                    <TiArrowBack className="w-5 h-5 transform rotate-[110deg] text-primary-500" />
                </button>
            </div>
        </>
    )
}

export default MenuHorizontalTabs
