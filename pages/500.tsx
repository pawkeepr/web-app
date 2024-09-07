import Link from 'next/link'
import React from 'react'

// Import Images

const Error500 = () => {
    return (
        <React.Fragment>
            <div className="py-5 auth-page-wrapper d-flex justify-content-center align-items-center min-vh-100">
                <div className="p-0 overflow-hidden auth-page-content">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center">
                                <h1 className="mb-4 text-primary">Oops !</h1>
                                <h4 className="mb-2 text-uppercase">
                                    Desculpe, página não encontrada 😭
                                    <br />
                                    <strong>{window.location.pathname}</strong>
                                </h4>

                                <Link href="/sign-in" className="btn btn-success">
                                    <i className="mdi mdi-home me-1" />
                                    Voltar para o Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Error500
