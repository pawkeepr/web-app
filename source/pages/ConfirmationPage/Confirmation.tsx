"use client";
import { useRouter } from "next/router";
import DefaultLayout from "../_layouts/dashboard/dashboard";
import { useAppDispatch } from "~/store/hooks";
import { resetLoading } from "~/store/actions";
import { useEffect } from "react";



const ConfirmationPage = () => {
    return (
        <DefaultLayout title="Confirmation">
            <div className="flex flex-col justify-center items-center gap-3 lg:mt-5">
                <p className="text-sm font-bold text-secondary-500">
                    Seja Bem-vindo(a)!
                </p>
            </div>
            <div className="mobile:!mt-0 mobile:p-0">
                <div className="flex justify-center item-center">
                    <div
                        className="spinner-border text-primary-500 w-40 h-40 my-4"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ConfirmationPage;