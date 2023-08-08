'use client'

import { useRouter } from 'next/navigation';
import { createContext, useEffect } from "react";
import cookies from '~/constants/cookies';
import LOADING from '~/constants/loading';
import { decrypt, encrypt } from '~/helpers/encrypt-and-decrypt';
import {
    recoverUserByToken,
    signInUser
} from '~/store/auth/login/actions';
import {
    LoginState,
    onChangePassword,
    onChangeRememberMe,
    onChangeUsername,
    onSetRememberMe,
    onToggleVisiblePassword as onToggleVisiblePasswordAction,
} from '~/store/auth/login/slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { getCookie, setCookie } from '~/utils/cookies-utils';

interface SignInData {
    username: string;
    password: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    password: string;
    username: string;
    visiblePassword: boolean;
    isLoading: LOADING;
    rememberMe: boolean;
    onToggleVisiblePassword: () => void;
    onToggleRememberMe: () => void;
    signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
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
        const token = getCookie(cookies.token.name)

        if (!token) {
            router.prefetch('/sign-in')
            return
        }

        dispatch(recoverUserByToken(token))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getRememberInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function signIn({ username, password }: SignInData) {
        await setRememberInfo()
        dispatch(signInUser({ username, password }))
    }

    async function setRememberInfo() {
        const JSON_REMEMBER = JSON.stringify({ username, password: encrypt(password) })

        if (rememberMe) {
            setCookie(cookies.remember.name, JSON_REMEMBER, cookies.remember.expires)
        }
    }

    async function getRememberInfo() {
        const rememberInfo = getCookie(cookies.remember.name)

        if (!rememberInfo) {
            return
        }

        const { username, password } = rememberInfo

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
        <AuthContext.Provider
            value={{
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

