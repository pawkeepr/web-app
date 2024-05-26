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
import StepGeral from '../../steps/step-geral'

import MenuHorizontalTabs from '~/Components/organism/menu-horizontal-tabs/menu-horizontal-tabs'
import StepTreatment from '../../steps/step-treatment'

type TabItem = {
    id: TabsOptions
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

// Pre anaminese/ Anaminese / exames realizados
// solicitar exames / Vacinação  e Vermefugo /  Medicação
// Demais Tratamento / diagnóstico / finalizar

const items: TabItem[] = [
    {
        id: 0,
        title: 'Pré-Anamnese',
        href: '#Inicio',
        Component: StepGeral,
    },
    {
        id: 1,
        title: 'Anamnese',
        href: '#Anamnese',
        Component: StepAnamneses,
    },
    {
        id: 2,
        title: 'Exames Realizados',
        href: '#Exams',
        Component: StepExams,
    },
    {
        id: 3,
        title: 'Solicitar Exames',
        href: '#Exams',
        Component: StepExams,
    },
    {
        id: 4,
        title: 'Vacinação  e Vermefugo',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 5,
        title: 'Medicação',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 6,
        title: 'Demais Tratamentos',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 7,
        title: 'Diagnóstico',
        href: '#Diagnostic',
        Component: StepDiagnosis,
    },
    // {
    //     id: 8,
    //     title: 'Finalizar',
    //     href: '#Finalizar',
    //     Component: StepPayment,
    // },
]

const Tabs = () => {
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

export default withLoading(Tabs)
