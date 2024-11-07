import { LOADING } from '~/constants/loading'

import { BtnLink } from '~/Components/atoms/btn'
import Loader from '~/Components/organism/loader'
import useModeProfile from '~/hooks/use-mode'
import { useAppSelector } from '~/store/hooks'
import { ModeProfile } from '~/types/profile'
import AuthLayout from '../../../_layouts/auth/auth_layout'
import AuthInputs from '../components/organism/auth-inputs'

export type CoverSignInProps = {
    bgImage: '/bg-sign-in.webp' | '/bg-three.jpg' | '/bg-sign-up.webp'
}

const CoverSignIn = ({ bgImage }: CoverSignInProps) => {
    const { mode } = useModeProfile()

    const { isLoading } = useAppSelector((state) => state.Login)

    const isPending = isLoading === LOADING.PENDING
    const isSuccessful = isLoading === LOADING.SUCCESS
    const loading = isPending || isSuccessful

    const link = mode === ModeProfile.vet ? '/veterinary/sign-up' : '/tutor/sign-up'

    return (
        <AuthLayout
            title="Entrar"
            image={bgImage}
            alt="Imagem"
            hasImage
            loading={loading}
        >
            {!loading && (
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-bold text-secondary-500">
                        Seja Bem-vindo(a)!
                    </p>
                </div>
            )}
            <div className="mobile:!mt-0 mobile:p-0 web:p-1">
                <Loader
                    condition={loading}
                    message="Aguarde um momento..."
                    type="TailSpin"
                />

                {!loading && (
                    <div className="web:max-h-[236px] p-2">
                        <AuthInputs mode={mode} />
                    </div>
                )}
            </div>

            {!loading && (
                <div className="flex flex-col items-center justify-center w-full mt-4 ">
                    <p className="font-normal text-gray-400 ">
                        Você não tem uma conta ?
                    </p>
                    <BtnLink message="Criar Conta" href={link} />
                </div>
            )}
        </AuthLayout>
    )
}

export default CoverSignIn
