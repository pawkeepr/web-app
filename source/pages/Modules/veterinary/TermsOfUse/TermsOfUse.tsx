import Link from 'next/link'

const TermsOfUse = () => {
    return (
        <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
            <h1 className="mb-8 text-4xl font-bold text-center">
                Termos de Uso do Pawkeepr
            </h1>
            <p className="mb-6 text-lg">
                Bem-vindo ao Pawkeepr! Estes Termos de Uso regem o uso do nosso
                aplicativo e serviços. Ao utilizar o Pawkeepr, você concorda com
                estes termos. Por favor, leia atentamente.
            </p>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    1. Aceitação dos Termos
                </h2>
                <p>
                    Ao acessar ou usar o Pawkeepr, você concorda em cumprir todos os
                    termos e condições estabelecidos aqui. Se você não concorda com
                    estes termos, não deve utilizar o Pawkeepr.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    2. Descrição dos Serviços
                </h2>
                <p>
                    O Pawkeepr oferece uma plataforma que facilita o cuidado com
                    pets, permitindo o acesso a prontuários eletrônicos,
                    agendamentos, marketing e networking, administração de negócios
                    e segurança de dados. Nossos serviços são destinados a tutores
                    de pets, profissionais de saúde veterinária e outros prestadores
                    de serviços relacionados.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">3. Cadastro e Conta</h2>
                <p>
                    Para acessar certos recursos do Pawkeepr, você deve criar uma
                    conta. Você concorda em fornecer informações precisas, completas
                    e atualizadas durante o processo de registro e a manter essas
                    informações atualizadas. Você é responsável por manter a
                    confidencialidade das credenciais de login da sua conta e por
                    todas as atividades que ocorrem sob sua conta.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">4. Uso Permitido</h2>
                <p className="mb-2">
                    Você concorda em usar o Pawkeepr exclusivamente para fins legais
                    e de acordo com estes termos. Você não deve:
                </p>
                <ul className="ml-8 space-y-2 list-disc">
                    <li>
                        Usar o app para qualquer atividade ilegal, fraudulenta ou
                        maliciosa;
                    </li>
                    <li>
                        Interferir no funcionamento do app ou tentar obter acesso
                        não autorizado ao mesmo;
                    </li>
                    <li>
                        Compartilhar ou publicar informações falsas, enganosas ou
                        prejudiciais.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    5. Propriedade Intelectual
                </h2>
                <p>
                    Todo o conteúdo do Pawkeepr, incluindo texto, gráficos, logos,
                    ícones, imagens, clipes de áudio, software e outros materiais, é
                    de propriedade da Pawkeepr ou de seus licenciadores e é
                    protegido por leis de direitos autorais e de propriedade
                    intelectual. Você concorda em não copiar, modificar, distribuir
                    ou criar trabalhos derivados baseados em qualquer parte do
                    conteúdo sem autorização expressa.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    6. Limitação de Responsabilidade
                </h2>
                <p className="mb-2">
                    O Pawkeepr oferece uma plataforma para facilitar o cuidado com
                    pets, mas não se responsabiliza por quaisquer danos diretos,
                    indiretos, incidentais, consequenciais ou punitivos decorrentes
                    do uso ou da incapacidade de usar o aplicativo. O uso do
                    Pawkeepr é por sua conta e risco.
                </p>
                <p className="mb-2">
                    Em particular, não nos responsabilizamos por:
                </p>
                <ul className="ml-8 space-y-2 list-disc">
                    <li>
                        <strong>Consultas e serviços veterinários:</strong> As
                        informações fornecidas pelo Pawkeepr, incluindo prontuários
                        e agendamentos, são apenas para referência. As decisões de
                        tratamento devem ser feitas diretamente com os profissionais
                        de saúde.
                    </li>
                    <li>
                        <strong>Erros ou omissões:</strong> Não garantimos a
                        precisão das informações fornecidas e não somos responsáveis
                        por quaisquer erros ou omissões nos dados exibidos.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    7. Links para Terceiros
                </h2>
                <p>
                    O Pawkeepr pode conter links para sites ou serviços de terceiros
                    que não são controlados por nós. Não endossamos, revisamos ou
                    temos responsabilidade sobre o conteúdo ou práticas de
                    privacidade de sites de terceiros. O uso desses links é por sua
                    conta e risco.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    8. Modificações e Atualizações
                </h2>
                <p>
                    O Pawkeepr reserva-se o direito de modificar ou descontinuar o
                    aplicativo ou seus serviços a qualquer momento, com ou sem aviso
                    prévio. Também podemos modificar estes Termos de Uso
                    periodicamente. Recomendamos que você revise estes termos
                    regularmente. O uso continuado do app após qualquer modificação
                    constitui sua aceitação dos termos revisados.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    9. Cancelamento e Suspensão
                </h2>
                <p>
                    Você pode encerrar sua conta a qualquer momento enviando uma
                    solicitação para nosso suporte. Reservamo-nos o direito de
                    suspender ou encerrar sua conta se acreditarmos que você violou
                    estes Termos de Uso ou se você usar o Pawkeepr de forma
                    prejudicial ou ilegal.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">10. Privacidade</h2>
                <p>
                    Ao utilizar o Pawkeepr, você também concorda com nossa{' '}
                    <Link
                        href="/privacy-policy"
                        className="text-blue-600 hover:underline"
                    >
                        Política de Privacidade
                    </Link>
                    , que explica como coletamos, usamos e protegemos suas
                    informações pessoais.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">
                    11. Legislação Aplicável
                </h2>
                <p>
                    Estes Termos de Uso são regidos e interpretados de acordo com as
                    leis do Brasil. Qualquer disputa relacionada ao Pawkeepr será
                    submetida à jurisdição exclusiva dos tribunais brasileiros.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">12. Contato</h2>
                <p>
                    Se você tiver dúvidas ou preocupações sobre estes Termos de Uso,
                    entre em contato conosco pelo{' '}
                    <a
                        href="mailto:comercial@pawkeepr.com"
                        className="text-primary-500 hover:underline"
                    >
                        comercial@pawkeepr.com
                    </a>
                    .
                </p>
            </section>
        </div>
    )
}

export default TermsOfUse
