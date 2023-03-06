import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect } from "react";
import cookies from '~/constants/cookies';
import LOADING from '~/constants/loading';
import { decrypt, encrypt } from '~/helpers/encrypt-and-decrypt';
import {
    LoginState,
    onChangePassword,
    onChangeRememberMe,
    onChangeUsername,
    onSetRememberMe,
    onToggleVisiblePassword as onToggleVisiblePasswordAction,
    recoverUserByToken,
    signInUser
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
    const dispatch = useAppDispatch();
    const {
        user,
        isAuthenticated,
        isLoading,
        password,
        rememberMe,
        username,
        visiblePassword,
    } = useAppSelector(state => state.Login as LoginState);
    const router = useRouter();

    useEffect(() => {
        dispatch(recoverUserByToken(getCookie(cookies.token.name)));
    }, [dispatch]);


    const handleRememberInfo = useCallback(async (username?: string, password?: string, rememberMe?: boolean) => {
        const JSON_REMEMBER = JSON.stringify({ username, password: encrypt(password as string) });

        if (rememberMe) {
            setCookie(cookies.remember.name, JSON_REMEMBER, cookies.remember.expires);
        } else {
            setCookie(cookies.remember.name, '', -1);
        }
        const rememberInfo = getCookie(cookies.remember.name);
        if (!rememberInfo) {
            return;
        }
        const { username: rememberUsername, password: rememberPassword } = JSON.parse(rememberInfo);
        dispatch(onSetRememberMe(true));
        dispatch(onChangeUsername(rememberUsername));
        dispatch(onChangePassword(decrypt(rememberPassword)));
    }, [dispatch]);

    useEffect(() => {
        handleRememberInfo()
    }, [handleRememberInfo]);

    const signIn = useCallback(async ({ username, password }: SignInData) => {
        await handleRememberInfo(username, password, rememberMe);
        dispatch(signInUser({ username, password }));
    }, [dispatch, handleRememberInfo, rememberMe]);

    const onToggleRememberMe = useCallback(() => {
        dispatch(onChangeRememberMe());
    }, [dispatch]);

    const onToggleVisiblePassword = useCallback(() => {
        dispatch(onToggleVisiblePasswordAction());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            return router.push('/dashboard');
        }

        return router.push('/sign-in');

    }, [router, isAuthenticated]);

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

export const useAuth = () => useContext(AuthContext);