const LoaderSuccess = () => {
    return (
        <div className="flex items-center space-y-4 ">
            <div className="flex flex-col items-center ">
                <svg
                    className="animate-check h-40 w-40 stroke-current text-green-500"
                    viewBox="0 0 64 64"
                >
                    <path
                        className="circle"
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        d="M32 16 A 16 16 0 0 1 32 48 A 16 16 0 0 1 32 16"
                    />
                    <path
                        className="check"
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        d="M20,32l8,8l16,-16"
                    />
                </svg>
                <h2 className="text-lg font-bold text-center text-gray-800">
                    {'Conta Criada com Sucesso!'}
                </h2>
                <h4 className="text-md font-bold text-center text-gray-800">
                    {'Um Email de Confirmação foi enviado, verifique seu email!'}
                </h4>
            </div>
        </div>
    )
}

export default LoaderSuccess
