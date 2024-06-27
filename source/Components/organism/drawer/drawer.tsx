import ModernDrawer from 'react-modern-drawer'

import { useGesture } from '@use-gesture/react'
import cn from 'classnames'
import useModal from '~/hooks/use-modal'
import type { DrawerProps } from './drawer-utils'
import MenuDrawer from './menu-drawer'

const Drawer = ({
    // visibleDrawer,
    mode: drawerItems = 'VETERINARY',
}: DrawerProps) => {
    const { closeModal, open, showModal } = useModal({ name: 'drawer' })

    const bind = useGesture({
        onDrag: ({ movement: [mx] }) => {
            if (mx > 100) {
                setTimeout(() => {
                    showModal()
                }, 100)
            }
        },
    })

    return (
        <ModernDrawer open={open} onClose={closeModal} direction="left">
            <div
                {...bind()}
                className={cn(
                    `
                        flex flex-col
                        h-full py-8 border-gray-200 dark:border-dark-600
                        overflow-y-auto bg-transparent dark:!bg-dark-500
                        overflow-x-hidden
                    `,
                )}
            >
                <MenuDrawer mode={drawerItems} condition={open} />
            </div>
        </ModernDrawer>
    )
}

export default Drawer
