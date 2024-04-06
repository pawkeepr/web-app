'use client'

import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import PropTypes from 'prop-types'
import type React from 'react'
import image from '../../styles/assets/images/landing/bg-pattern.png'

//import Components
import Footer from './Footer'
import Header from './Header'

//import actions

//redux
import cn from 'classnames'
import FieldDocumentAppointment from '~/Components/molecules/field-appointment-vet'
import Drawer from '~/Components/organism/drawer'
import { useBtnFloating } from '~/contexts/button-floating'
import useHookLayout from './use-hook'

type LayoutProps = {
    children: React.ReactNode
}

const LayoutTutor = ({ children }: LayoutProps) => {
    useHookLayout()
    const { hasButtonFloating } = useBtnFloating()

    return (
        <div id="relative">
            <Header drawer={(props) => <Drawer {...props} mode="TUTOR" />} />
            <div className='h-4 block web:hidden' />
            {/* <Sidebar layoutType={layoutType} /> */}

            <div
                className={cn(
                    'px-24 mobile:px-0 relative tablet:px-0 min-h-screen',
                    'mobile:pt-20 z-[0]',
                    // 'bg-cover bg-no-repeat bg-fixed',
                )}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {children}
                <FieldDocumentAppointment
                    condition={hasButtonFloating}
                    selectedTabInitial={0}
                >
                    {({ onChangeOpen }) => (
                        <div className="fixed mobile:flex mobile:flex-col items-center justify-center mobile:opacity-100 bottom-4 z-50 mobile:bottom-4 right-4  mobile:right-4 hidden ">
                            <button
                                type="button"
                                onClick={() => onChangeOpen(true)}
                                className="
                                    bg-primary-600 p-3 rounded-full 
                                    shadow-2xl 
                                    transition duration-500 ease-in-out
                                    opacity-40 hover:opacity-100 
                                "
                            >
                                <PlusIcon className="w-8 h-8 text-gray-50" />
                            </button>
                            <h6>Nova Consulta</h6>
                        </div>
                    )}
                </FieldDocumentAppointment>
            </div>
            <Footer condition={!hasButtonFloating} />
        </div>
    )
}

LayoutTutor.propTypes = {
    children: PropTypes.object,
}

export default LayoutTutor
