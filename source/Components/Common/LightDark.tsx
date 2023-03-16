
//constants
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { layoutModeTypes } from "../constants/layout";

import { useCallback } from "react";
import { changeLayoutMode } from '~/store/layouts/slice';


const LightDark = () => {

    const dispatch = useAppDispatch();
    const layoutMode = useAppSelector(state => state.Layout.layoutModeType);

    const onHandleChangeLayout = useCallback(() => {
        const mode = layoutMode === layoutModeTypes.LIGHT_MODE ? layoutModeTypes.DARK_MODE : layoutModeTypes.LIGHT_MODE;
        dispatch(changeLayoutMode(mode));
    }, [dispatch, layoutMode])

    return (
        <div className="ms-1 header-item d-none d-sm-flex">
            <button
                onClick={onHandleChangeLayout}
                type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
                <i className='bx bx-moon fs-22'></i>
            </button>
        </div>
    );
};

export default LightDark;