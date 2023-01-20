import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from 'nookies';
import { createContext, useContext, useEffect } from "react";


import cookies from '~/constants/cookies';
import LOADING from '~/constants/loading';
import { decrypt, encrypt } from '~/helpers/encrypt-and-decrypt';
import { setProfile } from '~/store/actions';
import {
    LoginState,
    onChangePassword,
    onChangeRememberMe,
    onChangeUsername,
    onSetRememberMe,
    onToggleVisiblePassword as onToggleVisiblePasswordAction,
    recover_user_by_token,
    sign_in_user
} from '~/store/auth/loginV2/slice';
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
    rememberMe: boolean;
    onToggleVisiblePassword: () => void;
    onToggleRememberMe: () => void;
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
        rememberMe,
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

        dispatch(recover_user_by_token({ token })).then((data) => {
            if (data.type === 'success') {
                console.log({ data })
                dispatch(setProfile(data.payload))
                router.prefetch('/dashboard')
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getRememberInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function signIn({ username, password }: SignInData) {
        await setRememberInfo()
        dispatch(sign_in_user({ username, password })).then(() => {
            router.push('/dashboard')
        })
    }

    async function setRememberInfo() {
        const JSON_REMEMBER = JSON.stringify({ username, password: encrypt(password) })

        if (rememberMe) {
            setCookie(null, cookies.remember.name, JSON_REMEMBER, {
                maxAge: cookies.remember.expires,
            })
        }
    }

    async function getRememberInfo() {
        const listAllCookies = parseCookies()
        const rememberInfo = listAllCookies[cookies.remember.name]

        if (!rememberInfo) {
            return
        }

        const { username, password } = JSON.parse(rememberInfo)

        dispatch(onSetRememberMe(true))
        dispatch(onChangeUsername(username))
        dispatch(onChangePassword(decrypt(password)))

    }

    const onToggleRememberMe = () => {
        dispatch(onChangeRememberMe())
    }

    const onToggleVisiblePassword = () => {
        dispatch(onToggleVisiblePasswordAction())
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            rememberMe,
            isLoading,
            password,
            username,
            visiblePassword,
            onToggleRememberMe,
            onToggleVisiblePassword,
            signIn,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}