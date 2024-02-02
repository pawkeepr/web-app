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
import FieldDocumentAppointment from '~/Components/molecules/field-document-appointment'
import useHookLayout from './use-hook'

type LayoutProps = {
    children: React.ReactNode
}

const LayoutMain = ({ children }: LayoutProps) => {
    useHookLayout()
    return (
        <div id="relative">
            <Header />
            {/* <Sidebar layoutType={layoutType} /> */}

            <div
                className={cn(
                    'px-24 mobile:px-0 relative',
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
                <FieldDocumentAppointment selectedTabInitial={0}>
                    {({ onChangeOpen }) => (
                        <div className="fixed flex flex-col items-center justify-center opacity-100 z-50 mobile:bottom-20 web:bottom-10 right-4">
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

                <Footer />
            </div>
        </div>
    )
}

LayoutMain.propTypes = {
    children: PropTypes.object,
}

export default LayoutMain
