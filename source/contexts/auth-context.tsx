'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useEffect } from 'react'
import { PUBLIC_ROUTES, PUBLIC_ROUTES_GENERAL } from '~/common/public-routes'
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
import type { TypeProfile } from '~/types/profile'

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

    const { isAuthenticated, isLoading, password, rememberMe, username, token } =
        useAppSelector((state) => state.Login as LoginState)

    const { user } = useAppSelector((state) => state.Profile)

    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const isPublicRoute = !!PUBLIC_ROUTES.find((route) => {
            if (route === '/') return route === pathname

            if (typeof pathname !== 'string') return true

            return pathname?.startsWith(route)
        })

        const isPublicRoutePossible = !!PUBLIC_ROUTES_GENERAL.find((route) => {
            if (typeof pathname !== 'string') return true

            return pathname?.startsWith(route)
        })

        if (isPublicRoutePossible) return
        if (!token && isPublicRoute) return
        if (pathname === '/logout') return

        const type_profile = user?.['custom:type_profile'] as TypeProfile

        if (!token) {
            dispatch(
                signOutUser({
                    type_profile,
                }),
            )
            return
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, token, user])

    useEffect(() => {
        if (!token) return
        dispatch(recoverUserByToken(token))
    }, [token])

    useEffect(() => {
        const has_profile = user?.['custom:has_profile']
        const type_profile = user?.['custom:type_profile'] as TypeProfile

        if (!has_profile || has_profile === 'yes') return

        const partial_route = type_profile === 1 ? 'veterinary' : 'tutor'
        router.push(`/${partial_route}/activation`)
    }, [user])

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
