import { useCallback } from "react";
import { layoutModeTypes } from "~/Components/constants/layout";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { changeLayoutMode } from '~/store/layouts/slice';

const useChangeLayoutMode = () => {
    const dispatch = useAppDispatch();
    const layoutMode = useAppSelector(state => state.Layout.layoutModeType);

    const onHandleChangeLayout = useCallback(() => {
        const mode = layoutMode === layoutModeTypes.LIGHT_MODE ? layoutModeTypes.DARK_MODE : layoutModeTypes.LIGHT_MODE;
        dispatch(changeLayoutMode(mode));
    }, [dispatch, layoutMode])

    return {
        onHandleChangeLayout
    }
}

export default useChangeLayoutMode;