import LogoSimpleMobile from "~/Components/atoms/logo-simple-mobile"

type ContainerProps = {
    children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="w-full px-6 pt-4">
            <div className="flex flex-col w-full items-center">
                <LogoSimpleMobile className='block' mb="mb-0" />
                <p className="text-muted">Aproveite todos os Benefícios Agora!</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Container