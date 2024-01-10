const LoaderPending = () => {
    return (
        <div className="flex items-center space-y-4 ">
            <div className="flex flex-col items-center">
                <div
                    className="spinner-border text-primary h-24 w-24 text-lg"
                    role="status"
                >
                    <span className="sr-only">Carregando...</span>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mt-2 animate-pulse">
                    Aguarde
                    <span className="animate-ellipsis" />
                </h2>
            </div>
        </div>
    )
}

export default LoaderPending
