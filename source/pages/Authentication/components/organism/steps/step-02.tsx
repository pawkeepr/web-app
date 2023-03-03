
type StepProps = {
    [key: string]: any;
    nextStep: () => void;
    prevStep: () => void;
}

const StepSignUp02 = ({ nextStep, prevStep, ...rest }: StepProps) => {
    return (
        <div className="p-lg-5 p-4">
            <div>
                <h5 className="text-primary">Criar Conta</h5>
                <p className="text-muted">Crie uma conta PawKeeprs gratuita agora e aproveite.</p>
            </div>

            <div className="mt-4">

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="name" placeholder="Digite seu nome" required />
                    <div className="invalid-feedback">
                        Escreva seu Nome Corretamente
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Sobrenome <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="lastname" placeholder="Digite seu sobrenome" required />
                    <div className="invalid-feedback">
                        Escreva seu sobrenome
                    </div>
                </div>


                {/* <div className="mb-4">
                    <p className="mb-0 fs-12 text-muted fst-italic">Você se registrando aceita os termos de uso da plataforma <Link href="#" className="text-primary text-decoration-underline fst-normal fw-medium">Termos de Uso</Link></p>
                </div> */}

                <div className="mt-4 d-flex justify-content-center">
                    <button className="btn btn-success w-40 m-1" type="button" onClick={prevStep}>Anterior</button>
                    <button className="btn btn-success w-40 m-1" type="button" onClick={nextStep}>Próximo</button>
                </div>

                {/* <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">Criar Conta</button>
                    </div> */}


            </div>
        </div>
    )
}

export default StepSignUp02