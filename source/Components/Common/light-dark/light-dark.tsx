import { layoutModeTypes } from '~/Components/constants/layout'

import useChangeLayoutMode from '~/hooks/use-change-layout-mode'

import MoonIcon from '@heroicons/react/24/solid/MoonIcon'
import SunIcon from '@heroicons/react/24/solid/SunIcon'

const LightDark = () => {
    const { mode, onHandleChangeLayout } = useChangeLayoutMode()
    const isLightMode = mode === layoutModeTypes.LIGHT_MODE

    return (
        <div className="flex">
            <button
                onClick={onHandleChangeLayout}
                type="button"
                className="btn-icon"
            >
                <span className="w-7 h-7 text-gray-200 dark:text-gray-200">
                    {isLightMode ? <MoonIcon /> : <SunIcon />}
                </span>
            </button>
        </div>
    )
}

export default LightDark
