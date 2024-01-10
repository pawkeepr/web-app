const LoaderError = () => {
    return (
        <div className="flex items-center space-y-4">
            <div className="flex flex-col items-center">
                <svg
                    className="animate-cancel-x h-40 w-40 stroke-current text-red-500"
                    viewBox="0 0 64 64"
                >
                    <path
                        className="line line-1"
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        d="M20,20 L44,44"
                    />
                    <path
                        className="line line-2"
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        d="M44,20 L20,44"
                    />
                </svg>
                <h2 className="text-lg font-bold text-center text-gray-800">
                    {'Ocorreu um Erro!'}
                </h2>
                <h4 className="text-md font-bold text-center text-gray-800">
                    {'Por favor, tente novamente.'}
                </h4>
            </div>
        </div>
    )
}

export default LoaderError
