'use client'

import ModernDrawer from 'react-modern-drawer'

import cn from 'classnames'
import { useEffect, useRef } from 'react'
import useModal from '~/hooks/use-modal'
import type { DrawerProps } from './drawer-utils'
import MenuDrawer from './menu-drawer'

const Drawer = ({
    // visibleDrawer,
    mode: drawerItems = 'VETERINARY',
}: DrawerProps) => {
    const { closeModal, open, showModal } = useModal({ name: 'drawer' })

    const divRef = useRef(null)

    useEffect(() => {
        if (!window || !divRef.current) {
            return
        }
        const Hammer = require('hammerjs')

        const hammer = new Hammer(divRef.current)

        hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
        hammer.on('swipeleft swiperight swipeup swipedown', (event) => {
            if (event.type === 'swipeleft') {
                closeModal()
            }

            if (event.type === 'swiperight') {
                showModal()
            }
        })

        // Cleanup the Hammer instance on component unmount
        return () => {
            hammer.stop(false)
            hammer.destroy()
        }
    }, [])

    return (
        <ModernDrawer open={open} onClose={closeModal} direction="left">
            <div
                ref={divRef}
                className={cn(
                    `
                        flex flex-col
                        h-full py-8 border-gray-200 dark:border-dark-600
                        overflow-y-auto bg-transparent dark:!bg-dark-500
                        overflow-x-hidden select-none
                    `,
                )}
            >
                <MenuDrawer mode={drawerItems} condition={open} />
            </div>
        </ModernDrawer>
    )
}

export default Drawer
