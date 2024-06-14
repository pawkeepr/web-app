const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <article className="max-w-2xl p-6 mx-auto mt-10 overflow-hidden bg-white rounded-lg shadow-lg">
                <header className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Política de Privacidade - App Pawkeeper
                    </h1>
                </header>

                <dl>
                    <div className="mb-6">
                        <dt className="mb-2 text-xl font-semibold">
                            1. Introdução
                        </dt>
                        <dd className="text-gray-700">
                            Esta Política de Privacidade explica como o aplicativo
                            Pawkeeper coleta, utiliza, e compartilha informações dos
                            usuários e de seus pets. Ao utilizar o aplicativo, você
                            concorda com esta política.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="mb-2 text-xl font-semibold">
                            2. Informações Coletadas
                        </dt>
                        <dd className="text-gray-700">
                            Coletamos informações fornecidas pelo usuário, como
                            nome, e-mail, e detalhes do pet. Além disso, coletamos
                            dados dos dispositivos vestíveis, incluindo atividades e
                            saúde do pet.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="mb-2 text-xl font-semibold">
                            3. Uso das Informações
                        </dt>
                        <dd className="text-gray-700">
                            Utilizamos as informações para fornecer os serviços do
                            aplicativo, como agendamento de consultas, monitoramento
                            da saúde do pet, e para comunicação e suporte ao
                            usuário.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="mb-2 text-xl font-semibold">
                            4. Compartilhamento de Informações
                        </dt>
                        <dd className="text-gray-700">
                            As informações podem ser compartilhadas com prestadores
                            de serviços terceirizados que nos ajudam a operar o
                            aplicativo. Não vendemos dados pessoais dos usuários a
                            terceiros.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="mb-2 text-xl font-semibold">
                            5. Segurança dos Dados
                        </dt>
                        <dd className="text-gray-700">
                            Empregamos medidas de segurança para proteger contra o
                            acesso não autorizado ou alteração, divulgação ou
                            destruição de dados.
                        </dd>
                    </div>

                    <div className="mb-6">
                        <dt className="mb-2 text-xl font-semibold">
                            6. Alterações na Política
                        </dt>
                        <dd className="text-gray-700">
                            Podemos atualizar esta Política de Privacidade
                            periodicamente. Notificaremos os usuários de quaisquer
                            mudanças significativas.
                        </dd>
                    </div>

                    <div className="mb-0">
                        <dt className="mb-2 text-xl font-semibold">7. Contato</dt>
                        <dd className="text-gray-700">
                            Se você tiver perguntas sobre esta Política de
                            Privacidade, entre em contato conosco através das
                            informações fornecidas no aplicativo.
                        </dd>
                    </div>
                </dl>
            </article>
        </div>
    )
}

export default PrivacyPolicy
