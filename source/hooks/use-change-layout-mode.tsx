import { useCallback, useMemo } from 'react'
import { layoutModeTypes } from '~/Components/constants/layout'
import cookies from '~/constants/cookies'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { changeLayoutMode } from '~/store/slices/layouts/slice'
import { setCookie } from '~/utils/cookies-utils'

const useChangeLayoutMode = () => {
    const dispatch = useAppDispatch()
    const layoutMode = useAppSelector((state) => state.Layout.layoutModeType)

    const mode = useMemo(
        () =>
            layoutMode === layoutModeTypes.LIGHT_MODE
                ? layoutModeTypes.DARK_MODE
                : layoutModeTypes.LIGHT_MODE,
        [layoutMode],
    )

    const onHandleChangeLayout = useCallback(() => {
        setCookie(cookies.layoutMode.name, mode, cookies.layoutMode.expires)
        dispatch(changeLayoutMode(mode))
    }, [dispatch, mode])

    return {
        onHandleChangeLayout,
        mode,
    }
}

export default useChangeLayoutMode
