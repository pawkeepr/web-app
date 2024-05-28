import { useState } from 'react'

// Import Swiper styles
import { BsArrowLeft, BsCashCoin } from 'react-icons/bs'
import 'swiper/css'
import 'swiper/css/scrollbar'
//
import { A11y, Controller } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { tv } from 'tailwind-variants'
import withLoading from '~/Components/helpers/with-loading'
import type { StepProps, TabsOptions } from '~/types/helpers'
import TabsAppointments from './tabs-appointment'
import TabsFinished from './tabs-finished'

type TabItem = {
    id: TabsOptions
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

const items: TabItem[] = [
    {
        id: 0,
        title: 'Inicio',
        href: '#Inicio',
        Component: TabsAppointments,
    },
    {
        id: 1,
        title: 'Pagamento',
        href: '#Pagamento',
        Component: TabsFinished,
    },
]

const buttonFloating = {
    button: tv({
        base: `
        fixed z-50 flex flex-col items-center justify-center 
        transition duration-500 ease-in-out mobile:opacity-100 
        bottom-4 mobile:bottom-24 right-5 opacity-40 
        hover:opacity-100
    `,
    }),
    title: tv({
        base: `
     mb-1 text-xs font-bold text-gray-600
    `,
    }),
    containerIcon: tv({
        base: `
        p-3 rounded-full shadow-2xl bg-secondary-500
    `,
    }),
    icon: tv({
        base: `
        w-6 h-6 text-gray-500
    `,
    }),
}

const Tabs = () => {
    const [activeItem, setActiveItem] = useState(items[0])
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const [swipperController, setSwipperController] = useState<any>()

    return (
        <Swiper
            // install Swiper modules
            modules={[A11y, Controller]}
            spaceBetween={0}
            slidesPerView={1}
            allowTouchMove={false}
            onSwiper={(swiper) => {
                setSwipperController(swiper)
            }}
            // pagination={{ clickable: true, }}
            onSlideChange={(swiper) => {
                const findItem =
                    items.find((i) => i.id === swiper.activeIndex) || items[0]
                setActiveItem(findItem)
            }}
            scrollbar={{ draggable: false }}
            pagination={{ clickable: false }}
        >
            {items.map(({ id, Component }, index) => {
                return (
                    <SwiperSlide
                        key={`${id}-${
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            index
                        }`}
                    >
                        <Component
                            activeTab={activeItem.id}
                            toggleTab={setActiveItem}
                        />
                    </SwiperSlide>
                )
            })}
            {activeItem === items[0] && (
                <button
                    type="button"
                    onClick={() => swipperController.slideTo(1)}
                    className={buttonFloating.button()}
                >
                    <h6 className={buttonFloating.title()}>Ir Para Pagamentos</h6>
                    <div className={buttonFloating.containerIcon()}>
                        <BsCashCoin className={buttonFloating.icon()} />
                    </div>
                </button>
            )}

            {activeItem === items[1] && (
                <button
                    type="button"
                    onClick={() => swipperController.slideTo(0)}
                    className={buttonFloating.button()}
                >
                    <h6 className={buttonFloating.title()}>Voltar para Consulta</h6>
                    <div className={buttonFloating.containerIcon()}>
                        <BsArrowLeft className={buttonFloating.icon()} />
                    </div>
                </button>
            )}
        </Swiper>
    )
}

export default withLoading(Tabs)
