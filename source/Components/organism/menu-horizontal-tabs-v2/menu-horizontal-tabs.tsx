import { useState } from 'react'
import { TiArrowBack, TiArrowForward } from 'react-icons/ti'

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
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1,
        )
    }

    return (
        <div className="flex items-center">
            <button type="button" onClick={handlePrev}>
                <TiArrowForward className="w-5 h-5 transform rotate-[240deg] text-primary-500 " />
            </button>
            <div className="w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${
                            (100 / 3) * (currentIndex % items.length)
                        }%)`,
                    }}
                >
                    {items.concat(items).map((tab) => (
                        <div
                            key={tab.id}
                            className="flex-shrink-0 w-1/3 p-4 text-center bg-gray-100 border border-gray-300"
                        >
                            {tab.title}
                        </div>
                    ))}
                </div>
            </div>
            <button type="button" onClick={handleNext}>
                <TiArrowBack className="w-5 h-5 transform rotate-[110deg] text-primary-500" />
            </button>
        </div>
    )
}

export default MenuHorizontalTabs
