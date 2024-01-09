'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BtnPrimary } from '~/Components/atoms/btn';
import { resetLoading } from '~/store/actions';
import { useAppDispatch } from '~/store/hooks';
import DefaultLayout from '../_layouts/dashboard/dashboard';

const ConfirmationPage = () => {
    return (
        <DefaultLayout title="Confirmation">
            <div className="flex flex-col justify-center items-center gap-7 lg:mt-52">
                <BtnPrimary
                    label="Confirmar Consulta"
                    className="w-2/4"
                    onClick={() => {}}
                />
                <BtnPrimary
                    label="Cancelar Consulta"
                    className="w-2/4"
                    onClick={() => {}}
                />
                <BtnPrimary
                    label="Remarcar Consulta"
                    className="w-2/4"
                    onClick={() => {}}
                />
            </div>
        </DefaultLayout>
    );
};

export default ConfirmationPage;
