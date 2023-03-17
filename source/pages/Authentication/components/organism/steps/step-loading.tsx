import { useFormikContext } from "formik"
import { useEffect } from "react"
import Container from "react-bootstrap/Container"
import { AccountSignUp } from "~/store/auth/register/types"
import { useAppSelector } from "~/store/hooks"


const StepLoading = () => {

    const { loading, success, error } = useAppSelector(state => state.Account)

    const { handleSubmit } = useFormikContext<AccountSignUp>()

    useEffect(() => {
        // handleSubmit()
    }, [handleSubmit])


    return (
        <Container className="p-lg-5 p-4 h-screen">
            <div className="flex justify-center h-100 ">
                {loading && (
                    <div className="flex items-center space-y-4 ">
                        <div className="flex flex-col items-center">
                            <div className="spinner-border text-primary h-24 w-24 text-lg" role="status">
                                <span className="sr-only">Carregando...</span>
                            </div>
                            <h2 className="text-2xl font-bold text-center text-gray-800 mt-2 animate-pulse">
                                Aguarde
                                <span className="animate-ellipsis" />
                            </h2>
                        </div>
                    </div>
                )}

                {!loading && false && (
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
                            <h2 className="text-2xl font-bold text-center text-gray-800">Conta Criada com Sucesso!</h2>
                        </div>
                    </div>
                )}

                {true && (
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
                            <h2 className="text-2xl font-bold text-center text-gray-800">
                                {"Ocorreu um Erro!"}
                            </h2>
                            <h4 className="text-lg font-bold text-center text-gray-800">
                                {"Por favor, tente novamente."}
                            </h4>
                        </div>
                    </div>
                )}
            </div>

        </Container>
    )
}

export default StepLoading