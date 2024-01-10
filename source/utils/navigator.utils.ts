export const browser = () => {
    const userAgentString = navigator?.userAgent
    // Expressão regular para extrair o nome do navegador
    const browserRegex = /(Chrome|Firefox|Safari|Edge|Opera|Internet Explorer)\//i
    // Encontra a correspondência na string do user agent
    const match = userAgentString.match(browserRegex)
    // Verifica se houve uma correspondência e obtém o valor correspondente
    const browser = match ? match[1] : 'Navegador Desconhecido'

    return browser
}
