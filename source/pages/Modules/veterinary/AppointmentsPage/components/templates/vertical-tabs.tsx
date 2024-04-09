import cn from 'classnames'
import { useEffect, useState } from 'react'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Controller, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { tv } from 'tailwind-variants'
import { BtnIcon } from '~/Components/atoms/btn'
import withLoading from '~/Components/helpers/with-loading'
import ModalConfirm from '~/Components/modals/confirm-modal'
import useModal from '~/hooks/use-modal'
import useResizeMobile from '~/hooks/use-resize-mobile'
import type { StepProps, Tabs } from '~/types/helpers'
import StepAnamneses from '../organisms/steps/step-anamnese'
import StepDiagnosis from '../organisms/steps/step-diagnosis'
import StepGeral from '../organisms/steps/step-geral'
import StepPayment from '../organisms/steps/step-payment'
import StepTreatment from '../organisms/steps/step-treatment'

type TabItem = {
    id: Tabs
    title: string
    href: string
    Component: (props: StepProps) => JSX.Element
}

const items: TabItem[] = [
    {
        id: 0,
        title: 'Inicio',
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
        title: 'Diagnóstico',
        href: '#Diagnostic',
        Component: StepDiagnosis,
    },
    {
        id: 3,
        title: 'Tratamento',
        href: '#Treatment',
        Component: StepTreatment,
    },
    {
        id: 4,
        title: 'Finalizar',
        href: '#Finalizar',
        Component: StepPayment,
    },
]

const tab = tv({
    // Ajuste os estilos base e variantes conforme necessário
    base: `
        w-full flex-1 mobile:!py-4 py-2
        font-bold text-white
        mobile:text-xs
        text-sm flex web:flex-row items-center justify-center
        mobile:flex-col gap-2 !rounded-none
        mobile:border
        `,
    // Ajustes adicionais para os estilos mobile
    variants: {
        selected: {
            true: '!bg-secondary-500 !text-gray-600 shadow',
            false: 'text-gray-400 ',
        },
        disabled: {
            true: '!text-gray-600 cursor-not-allowed bg-transparent hover:bg-transparent hover:text-gray-600',
            false: 'text-blue-100 ',
        },
    },
})

const VerticalTabs = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [swipperController, setSwipperController] = useState<any>()
    const { isMobile } = useResizeMobile()
    const { showModal, closeModal } = useModal({ name: 'warning' })

    const router = useRouter()

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault()
            event.returnValue = '' // Necessário para alguns navegadores
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [])

    useEffect(() => {
        const handleRouteChange = (url) => {
            router.events.emit('routeChangeError')
            showModal()
            throw `Route change to ${url} was aborted.`
        }

        router.events.on('routeChangeStart', handleRouteChange)

        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
            closeModal()
        }
    }, [router])

    return (
        <section className="bg-white mt-1">
            <ModalConfirm
                title="Cancelar Consulta!"
                onConfirm={() => router.push('/dashboard')}
                description="Importante!"
                message="Esta ação irá cancelar todas as operações realizadas até o momento, deseja continuar?"
            >
                {(showModal) => {
                    return (
                        <div className="w-full bg-primary-500 rounded-t-sm justify-end flex p-0 py-1">
                            <BtnIcon
                                type="button"
                                icon={
                                    <XMarkIcon className="font-extrabold text-secondary-400 hover:bg-red-500 rounded-sm" />
                                }
                                className="w-fit !p-0 !m-0 h-fit"
                                onClick={showModal}
                                aria-label="Close modal"
                            />
                        </div>
                    )
                }}
            </ModalConfirm>
            <div
                className={cn(
                    `   
                        flex flex-row justify-center
                        mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0
                        mobile:p-0 
                        h-fit z-[100] bg-white mobile:border-t-2 border-primary-500
                        nav-pills nav-justified
                    `,
                )}
            >
                {items.map((item) => {
                    return (
                        <button
                            type="button"
                            // href={item.href}
                            id="steparrow-gen-info-tab"
                            className={tab({
                                selected: activeIndex === item.id,
                            })}
                            onClick={() => {
                                swipperController?.slideTo(item.id)
                                setActiveIndex(item.id)
                            }}
                        >
                            {item.title}
                        </button>
                    )
                })}
            </div>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
                spaceBetween={50}
                slidesPerView={1}
                onSwiper={(swiper) => {
                    setSwipperController(swiper)
                }}
                // pagination={{ clickable: true, }}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex)
                }}
                scrollbar={isMobile ? false : { draggable: false }}
            >
                {items.map(({ id, Component }, index) => {
                    return (
                        <SwiperSlide key={`${id}-${index}`}>
                            <div
                                className="flex flex-1 flex-col "
                                style={{
                                    height: 'calc(100vh - 120px)',
                                }}
                                id="Inicio"
                            >
                                <Component
                                    activeTab={activeIndex}
                                    toggleTab={setActiveIndex}
                                />
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    )
}

export default withLoading(VerticalTabs)
