import { useState } from 'react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

//
import { A11y, Controller, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react'
import withLoading from '~/Components/helpers/with-loading'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { StepProps, TabsOptions } from '~/types/helpers'
import StepAnamneses from '../../steps/step-anamnese'
import StepDiagnosis from '../../steps/step-diagnosis'
import StepExams from '../../steps/step-exams'

import AppointmentsErrsModal from '~/Components/modals/appointments-errs-modal'
import MenuHorizontalTabs from '~/Components/organism/menu-horizontal-tabs'
import StepPhysicalExam from '../../steps/step-physical-exam'
import StepSupplementation from '../../steps/step-supplementation'
import StepTreatment from '../../steps/step-treatment'
import StepVaccination from '../../steps/step-vaccination'
import StepVermifuge from '../../steps/step-vermifuge'

type TabItem = {
    id: TabsOptions
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

// Anamnese / Exames
// Vacinação  e Vermifugo /  Medicação
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
        title: 'Exame Físico',
        href: '#PhysicalExam',
        Component: StepPhysicalExam,
    },
    {
        id: 2,
        title: 'Exames',
        href: '#Exams',
        Component: StepExams,
    },
    {
        id: 3,
        title: 'Vacinação',
        href: '#Vaccination',
        Component: StepVaccination,
    },
    {
        id: 4,
        title: 'Vermifugo',
        href: '#Vermifuge',
        Component: StepVermifuge,
    },
    {
        id: 5,
        title: 'Medicação',
        href: '#Medication',
        Component: StepTreatment,
    },
    {
        id: 6,
        title: 'Suplementação',
        href: '#Treatment',
        Component: StepSupplementation,
    },
    {
        id: 7,
        title: 'Diagnóstico',
        href: '#Diagnostic',
        Component: StepDiagnosis,
    },
]

const TabsAppointments = ({ toggleTab }: StepProps) => {
    const [activeItem, setActiveItem] = useState(items[0])
    const [swipperController, setSwipperController] = useState<SwiperClass | null>(
        null,
    )
    const { isMobile } = useResizeMobile()

    return (
        <>
            <section className="bg-white web:mt-2">
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
                                    className="flex flex-col flex-1 w-full px-2 pb-24 overflow-y-auto scroll"
                                    style={{
                                        height: 'calc(100vh - 120px)',
                                    }}
                                    id="Inicio"
                                >
                                    <Component
                                        activeTab={activeItem.id}
                                        toggleTab={(tab) =>
                                            setActiveItem(items[tab])
                                        }
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>
            <AppointmentsErrsModal toggleTab={() => toggleTab?.(1)} />
        </>
    )
}

export default withLoading(TabsAppointments)
