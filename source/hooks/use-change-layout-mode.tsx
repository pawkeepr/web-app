import { useCallback, useMemo } from "react";
import { layoutModeTypes } from "~/Components/constants/layout";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { changeLayoutMode } from "~/store/layouts/slice";

const userPreferenceMode = () => {
    let preferenceMode = localStorage.getItem("userPreferenceMode");

    if (!preferenceMode) {
        preferenceMode = "light";
        localStorage.setItem("userPreferenceMode", preferenceMode);
    } else {
        preferenceMode = preferenceMode === "dark" ? "light" : "dark";
        localStorage.setItem("userPreferenceMode", preferenceMode);
    }

    return preferenceMode;
};

const useChangeLayoutMode = () => {
    const dispatch = useAppDispatch();
    const layoutMode = useAppSelector((state) => state.Layout.layoutModeType);

    const mode = useMemo(() => layoutMode === layoutModeTypes.LIGHT_MODE ?
        layoutModeTypes.DARK_MODE :
        layoutModeTypes.LIGHT_MODE,
        [layoutMode]
    )

    const onHandleChangeLayout = useCallback(() => {
        dispatch(changeLayoutMode(mode));
    }, [dispatch, mode]);

    return {
        onHandleChangeLayout,
        mode,
    };
};

export default useChangeLayoutMode;
