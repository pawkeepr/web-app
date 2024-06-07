'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useEffect } from 'react'
import { PUBLIC_ROUTES } from '~/common/public-routes'
import cookies from '~/constants/cookies'
import type LOADING from '~/constants/loading'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    recoverUserByToken,
    signInUser,
    signOutUser,
} from '~/store/slices/auth/login/actions'
import {
    onChangeRememberMe,
    type LoginState,
} from '~/store/slices/auth/login/slice'
import { getCookie } from '~/utils/cookies-utils'

interface SignInData {
    username: string
    password: string
}

interface AuthContextType {
    isAuthenticated: boolean
    user: unknown
    password: string
    username: string
    isLoading: LOADING
    rememberMe: boolean
    onToggleRememberMe: () => void
    signIn: (data: SignInData) => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const dispatch = useAppDispatch()
    const { user, isAuthenticated, isLoading, password, rememberMe, username } =
        useAppSelector((state) => state.Login as LoginState)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const token = getCookie(cookies.token.name)

        const isPublicRoute = !!PUBLIC_ROUTES.find((route) => {
            if (route === '/') return route === pathname

            if (typeof pathname !== 'string') return true

            return pathname?.startsWith(route)
        })

        if (!token && isPublicRoute) return
        if (pathname === '/logout') return

        const type_profile = user?.['custom:type_profile'] as TypeProfile
        if (!token) {
            dispatch(
                signOutUser({
                    type_profile: Number(user?.['custom:type_profile'] || 1),
                }),
            )
            router.prefetch('/sign-in')
            return
        }

        dispatch(recoverUserByToken(token))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    function signIn({ username, password }: SignInData) {
        return dispatch(signInUser({ username, password }))
    }

    const onToggleRememberMe = () => {
        dispatch(onChangeRememberMe())
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                rememberMe,
                isLoading,
                password,
                username,
                onToggleRememberMe,
                signIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
