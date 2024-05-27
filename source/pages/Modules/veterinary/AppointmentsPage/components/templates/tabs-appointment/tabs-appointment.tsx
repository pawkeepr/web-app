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
import StepAnamneses from '../../steps/step-anamnese'
import StepDiagnosis from '../../steps/step-diagnosis'
import StepExams from '../../steps/step-exams'

import MenuHorizontalTabs from '~/Components/organism/menu-horizontal-tabs/menu-horizontal-tabs'
import StepTreatment from '../../steps/step-treatment'

type TabItem = {
    id: TabsOptions
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

// Pre anaminese/ Anaminese / Exames
// Vacinação  e Vermefugo /  Medicação
// Alimentação e Suplementação / Diagnóstico

const items: TabItem[] = [
    {
        id: 0,
        title: 'Anamnese',
        href: '#Anamnese',
        Component: StepAnamneses,
    },
    {
        id: 1,
        title: 'Exames',
        href: '#Exams',
        Component: StepExams,
    },
    {
        id: 2,
        title: 'Vacinação  e Vermifugo',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 3,
        title: 'Medicação',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 4,
        title: 'Alimentação e Suplementação',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 5,
        title: 'Diagnóstico',
        href: '#Diagnostic',
        Component: StepDiagnosis,
    },
]

const TabsAppointments = () => {
    const [activeItem, setActiveItem] = useState(items[0])
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const [swipperController, setSwipperController] = useState<any>()
    const { isMobile } = useResizeMobile()

    return (
        <section className="mt-1 bg-white">
            <MenuHorizontalTabs
                items={items}
                onClick={(item) => {
                    const findItem = items.find((i) => i.id === item.id) || items[0]
                    swipperController?.slideTo(findItem?.id as number)
                    setActiveItem(findItem)
                }}
                activeItem={activeItem}
            />
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
                        items.find((i) => i.id === swiper.activeIndex) || items[0]
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
    )
}

export default withLoading(TabsAppointments)
