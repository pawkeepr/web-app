import Image from 'next/image'
import Link from 'next/link'

// Import Images
import error500 from '~/assets/images/error500.png'

const Error500 = () => {
    return (
        <div className="py-5 auth-page-wrapper d-flex justify-content-center align-items-center min-vh-100">
            <div className="p-2 overflow-hidden card auth-page-content">
                <div className="error-500 position-relative">
                    <Image
                        src={error500}
                        alt=""
                        className="img-fluid error-500-img error-img"
                    />
                    <h1 className="title text-muted">500</h1>
                </div>
                <div>
                    <h3>Internal Server Error!</h3>
                    <p className="mx-auto text-muted w-75">
                        Server Error 500. We're not exactly sure what happened, but
                        our servers say something is wrong.
                    </p>
                    <Link href="/dashboard" className="btn btn-success">
                        <i className="mdi mdi-home me-1"></i>Back to home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Error500
