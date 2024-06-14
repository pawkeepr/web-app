const TermsOfUse = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <article className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-10">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Termos de Uso - App PawKeeper
                    </h1>
                </header>

                <dl>
                    <div className="mb-6">
                        <dt className="text-xl font-semibold mb-2">
                            I. Introdução
                        </dt>
                        <dd className="text-gray-700">
                            Bem-vindo ao PawKeeper, um aplicativo de Open Health
                            para pets que utiliza inteligência artificial para
                            monitorar a saúde dos animais de estimação. Este
                            documento descreve os termos e condições de uso do
                            aplicativo.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="text-xl font-semibold mb-2">
                            II. Cadastro e Uso da Conta
                        </dt>
                        <dd className="text-gray-700">
                            É necessário registrar-se e manter informações
                            atualizadas. A segurança da conta é de responsabilidade
                            do usuário.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="text-xl font-semibold mb-2">
                            III. Coleta e Uso de Dados
                        </dt>
                        <dd className="text-gray-700">
                            O aplicativo coleta dados sobre a saúde e atividade do
                            pet. Estes dados são usados para análises e
                            recomendações personalizadas.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="text-xl font-semibold mb-2">
                            IV. Privacidade e Proteção de Dados
                        </dt>
                        <dd className="text-gray-700">
                            Comprometemo-nos a proteger os dados pessoais dos
                            usuários e seus pets, usando-os apenas para fins
                            descritos.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="text-xl font-semibold mb-2">
                            V. Limitação de Responsabilidade
                        </dt>
                        <dd className="text-gray-700">
                            As informações fornecidas pelo aplicativo são de caráter
                            geral e não substituem o aconselhamento veterinário
                            profissional.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="text-xl font-semibold mb-2">
                            VI. Alterações nos Termos
                        </dt>
                        <dd className="text-gray-700">
                            Os termos de uso podem ser alterados a qualquer momento,
                            e as mudanças entram em vigor imediatamente após sua
                            publicação.
                        </dd>
                    </div>

                    <div className="mb-0">
                        <dt className="text-xl font-semibold mb-2">VII. Contato</dt>
                        <dd className="text-gray-700">
                            Em caso de dúvidas ou sugestões, os usuários podem
                            entrar em contato através dos meios fornecidos no
                            aplicativo.
                        </dd>
                    </div>
                </dl>
            </article>
        </div>
    )
}

export default TermsOfUse
