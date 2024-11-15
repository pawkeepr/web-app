'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, useEffect } from 'react'
import { PUBLIC_ROUTES, PUBLIC_ROUTES_GENERAL } from '~/common/public-routes'
import type LOADING from '~/constants/loading'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import useProfile from '~/store/hooks/profile/use-profile'
import {
    recoverUserByToken,
    signInUser,
    signOutUser,
} from '~/store/slices/auth/login/actions'
import {
    type LoginState,
    onChangeRememberMe,
} from '~/store/slices/auth/login/slice'
import type { AttrTypeProfile } from '~/types/profile'

interface SignInData {
    username: string
    password: string
    mode: 'vet' | 'tutor'
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
    const { data: profile, isLoading: isProfileLoading } = useProfile()

    const {
        user,
        isAuthenticated,
        isLoading,
        password,
        rememberMe,
        username,
        token,
    } = useAppSelector((state) => state.Login as LoginState)

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

        const type_profile = user?.['custom:type_profile'] as AttrTypeProfile

        if (!token) {
            dispatch(
                signOutUser({
                    type_profile,
                }),
            )
            return
        }
    }, [pathname, token, user])

    useEffect(() => {
        if (!token || !isAuthenticated) return
        dispatch(recoverUserByToken(token))
    }, [token, isAuthenticated])

    // TODO: Deve ser removido, pois a lógica de redirecionamento deve ser feita na página de ativação
    useEffect(() => {
        if (isProfileLoading) return
        if (profile) return
        if (!user) return
        const isPublicRoute = !!PUBLIC_ROUTES.find((route) => {
            if (route === '/') return route === pathname

            if (typeof pathname !== 'string') return true

            return pathname?.startsWith(route)
        })
        if (isPublicRoute) return
        const has_profile = user?.['custom:has_profile']
        if (!has_profile || has_profile === 'yes') return

        const type_profile = user?.['custom:type_profile'] as AttrTypeProfile

        const partial_route = type_profile === '1' ? 'v' : 't'
        router.push(`/${partial_route}/activation`)
    }, [user, profile, isProfileLoading])

    function signIn({ username, password, mode }: SignInData) {
        return dispatch(signInUser({ username, password, mode }))
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
