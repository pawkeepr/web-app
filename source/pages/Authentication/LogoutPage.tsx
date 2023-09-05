'use client';

import { useEffect } from 'react';



import { resetLoading, signOutUser } from '~/store/auth/login/actions';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { useRouter } from 'next/navigation';
import { BtnLink } from '~/Components/atoms/btn';
import AuthLayout from '../_layouts/auth/auth_layout';


const LogoutPage = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.Login)
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in')
        }

        if (isAuthenticated) {
            dispatch(signOutUser());
            setTimeout(() => {
                dispatch(resetLoading());
                router.push('/sign-in')
            }, 1000);
        }
    }, [dispatch, isAuthenticated, router]);

    return (
        <AuthLayout title='Sair'>

            <div className='flex flex-col items-center justify-center'>
                {/* icon de um emoji chorando */}
                <div className="mt-4 pt-2">
                    <h4>Você acabou de sair 😭</h4>
                    <p className="text-muted">Obrigado por usar <span className="fw-bold">PawKeeprs</span>, não esqueça de voltar</p>
                    <BtnLink href='sign-in' className="!w-full !bg-primary-500" message='Entrar' />
                </div>
            </div>

        </AuthLayout>
    );
};

export default LogoutPage;