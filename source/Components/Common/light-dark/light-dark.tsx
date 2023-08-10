
import { layoutModeTypes } from "~/Components/constants/layout";

import useChangeLayoutMode from "~/hooks/use-change-layout-mode";

import MoonIcon from '@heroicons/react/24/solid/MoonIcon';
import SunIcon from '@heroicons/react/24/solid/SunIcon';

const LightDark = () => {

    const { mode, onHandleChangeLayout } = useChangeLayoutMode()
    const isLightMode = mode === layoutModeTypes.LIGHT_MODE;

    const style = 'w-7 h-7 text-gray-200 dark:text-gray-200'

    return (
        <div className="ms-1 header-item d-none d-sm-flex">
            <button
                onClick={onHandleChangeLayout}
                type="button" className="btn-icon">
                {isLightMode ? <MoonIcon className={style} /> : <SunIcon className={style} />}
            </button>
        </div>
    );
};

export default LightDark;