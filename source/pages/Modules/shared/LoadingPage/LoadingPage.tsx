import Loader from '~/Components/organism/loader'

const LoadingPage = () => {
    return (
        <div className="bg-primary-500 min-h-screen min-w-full flex flex-1 items-center justify-center">
            <div className="flex flex-col justify-center items-center h-full animate-pulse transition-all duration-500 ease-in-out">
                <div className="flex justify-center items-center">
                    <img src="/logo-light.png" alt="Logo" className="w-80 h-40" />
                </div>
                <Loader
                    type="ProgressBar"
                    color="red"
                    size={100}
                    barColor="#FFC86B"
                    borderColor="#fff"
                />
            </div>
        </div>
    )
}

export default LoadingPage
