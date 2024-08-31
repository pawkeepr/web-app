// Função para mover arquivos e diretórios para o backup
const fs = require('node:fs')
const path = require('node:path')

// Função para mover arquivos e diretórios
/**
 * Função para mover arquivos e diretórios para o backup
 * @param {string} dir Caminho do diretório a ser movido
 * @param {string} dest Caminho do diretório de backup
 */
function movePages(dir, dest) {
    // Move arquivos e diretórios para o diretório de backup
    // mantendo a estrutura de diretórios
    const files = fs.readdirSync(dir)

    // Cria o diretório se não existir
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true })
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const filePath = path.join(dir, file)
        const destPath = path.join(dest, file)

        try {
            const stats = fs.statSync(filePath)

            if (stats.isDirectory()) {
                // Cria o diretório de backup correspondente
                if (!fs.existsSync(destPath)) {
                    fs.mkdirSync(destPath, { recursive: true })
                }
                // Recurse em subdiretórios
                movePages(filePath, destPath)
            } else if (stats.isFile()) {
                fs.copyFileSync(filePath, destPath)
                console.log(`Moved to backup: ${filePath}`)
                fs.unlinkSync(filePath)
            }
        } catch (error) {
            console.error(`Error moving file ${filePath}: ${error.message}`)
        }
    }
}

module.exports = movePages
