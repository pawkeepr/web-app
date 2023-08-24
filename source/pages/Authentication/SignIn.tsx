import Image from "next/image";
import { useEffect } from "react";

import bgAuthaimage from "~/assets/images/bg-three.webp";
import logoMobile from "~/assets/images/logo-mobile-login.png";
import logo from "~/assets/images/logo-sm.png";

import LOADING from "~/constants/loading";
import AuthInputs from "./components/organism/auth-inputs";

import { useRouter } from "next/navigation";
import { BtnLink } from "~/Components/atoms/btn";
import { resetLoading } from "~/store/auth/login/actions";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import AuthLayout from "../_layouts/auth/auth_layout";

const CoverSignIn = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAppSelector(
        (state) => state.Login
    );
    const dispatch = useAppDispatch();

    const loading = isLoading === LOADING.PENDING

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(resetLoading());
            router.push("/dashboard");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
        <AuthLayout title="Entrar" image={bgAuthaimage} alt="Imagem" hasImage>


            <div className="flex flex-col justify-center items-center gap-3 lg:mt-5">
                <Image
                    src={logo}
                    alt="logo"
                    className="hidden mobile:flex h-16 w-16"
                />
                <Image
                    src={logoMobile}
                    alt="logo"
                    className="mobile:hidden flex h-24 w-auto object-cover"
                />
                <p className="text-sm font-light text-primary-500">
                    Seja bem-vindo(a)!
                </p>
            </div>
            <div className="px-10 mobile:!mt-0 mobile:p-0">
                {loading && (
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
                )}

                {!loading && <AuthInputs />}
            </div>

            <div className="w-full flex flex-col justify-center items-center ">
                <p className="-mb-2 text-gray-400 font-normal">
                    Você não tem uma conta ?
                </p>
                <BtnLink
                    message="Criar Conta"
                    href="/sign-up"
                />
            </div>

        </AuthLayout>
    );
};

export default CoverSignIn;
