import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { createContext, useContext, useEffect } from "react";


import cookies from '~/constants/cookies';
import LOADING from '~/constants/loading';
import { LoginState, recover_user_by_token, sign_in_user } from '~/store/auth/loginV2/slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

type SignInData = {
    username: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: any;
    password: string;
    username: string;
    visiblePassword: boolean;
    isLoading: LOADING;
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

type AuthProviderProps = {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const dispatch = useAppDispatch()
    const {
        user,
        isAuthenticated,
        isLoading,
        password,
        username,
        visiblePassword
    } = useAppSelector(state => state.Login as LoginState)
    const router = useRouter()

    useEffect(() => {
        const listAllCookies = parseCookies()
        const token = listAllCookies[cookies.token.name]

        if (!token) {
            router.prefetch('/sign-in')
            return
        }

        dispatch(recover_user_by_token({ token })).then(() => {
            router.prefetch('/dashboard')
        })

    }, [dispatch, router])

    async function signIn({ username, password }: SignInData) {
        dispatch(sign_in_user({ username, password })).then(() => {
            router.push('/dashboard')
        })
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            isLoading,
            password,
            username,
            visiblePassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}