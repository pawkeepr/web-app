import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { api } from "../services/api";

import cookies from '~/constants/cookies'

type User = {
    name: string;
    email: string;
    avatar_url: string;
}

type SignInData = {
    email: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

type AuthProviderProps = {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    const isAuthenticated = !!user;

    useEffect(() => {
        const listAllCookies = parseCookies()
        const token = listAllCookies[cookies.token]
        if (token) {
            // recoverUserInformation().then(response => {
            //     setUser(response.user)
            // })
        }
    }, [])

    async function signIn({ email, password }: SignInData) {
        // const { token, user } = await signInRequest({
        //     email,
        //     password,
        // })
        const token = 'token'

        setCookie(undefined, cookies.token, token, {
            maxAge: 60 * 60 * 1, // 1 hour
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        setUser(user)

        Router.push('/dashboard');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}