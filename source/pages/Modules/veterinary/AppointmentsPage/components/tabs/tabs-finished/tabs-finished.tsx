import { useState } from 'react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
//
import { A11y, Controller, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import withLoading from '~/Components/helpers/with-loading'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { StepProps, TabsOptions } from '~/types/helpers'

import BtnFloating from '~/Components/molecules/btn-floating'

import { BsArrowLeft } from 'react-icons/bs'
import MenuHorizontalTabs from '~/Components/organism/menu-horizontal-tabs'
import StepPayment from '../../steps/step-payment'

type TabItem = {
    id: TabsOptions
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

// Paymment / Feedback

const items: TabItem[] = [
    {
        id: 0,
        title: 'Pagamento',
        href: '#Payment',
        Component: StepPayment,
    },
]

const TabsFinished = ({ toggleTab }: StepProps) => {
    const [activeItem, setActiveItem] = useState(items[0])
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const [swipperController, setSwipperController] = useState<any>()
    const { isMobile } = useResizeMobile()

    return (
        <>
            <section className="mt-1 bg-white">
                <div className="hidden">
                    <MenuHorizontalTabs
                        items={items}
                        onClick={(item) => {
                            const findItem =
                                items.find((i) => i.id === item.id) || items[0]
                            swipperController?.slideTo(findItem?.id as number)
                            setActiveItem(findItem)
                        }}
                        activeItem={activeItem}
                    />
                </div>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSwiper={(swiper) => {
                        setSwipperController(swiper)
                    }}
                    // pagination={{ clickable: true, }}
                    onSlideChange={(swiper) => {
                        const findItem =
                            items.find((i) => i.id === swiper.activeIndex) ||
                            items[0]
                        setActiveItem(findItem)
                    }}
                    scrollbar={isMobile ? false : { draggable: false }}
                >
                    {items.map(({ id, Component }, index) => {
                        return (
                            <SwiperSlide
                                key={`${id}-${
                                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                    index
                                }`}
                            >
                                <div
                                    className="flex flex-col flex-1 w-full overflow-y-auto scroll"
                                    style={{
                                        height: 'calc(100vh - 120px)',
                                    }}
                                    id="Inicio"
                                >
                                    <Component
                                        activeTab={activeItem.id}
                                        toggleTab={setActiveItem}
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>
            <BtnFloating
                onClick={() => toggleTab?.(0)}
                icon={BsArrowLeft}
                position-y="top"
                title="Voltar"
            />
        </>
    )
}

export default withLoading(TabsFinished)
