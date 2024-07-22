import { useState } from 'react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar'
//
import { A11y, Controller } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
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
                            toggleTab={(tab: number) =>
                                swipperController.slideTo(tab)
                            }
                        />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default withLoading(Tabs)
