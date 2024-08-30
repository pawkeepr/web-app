const fs = require('node:fs')
const path = require('node:path')
const mode = require('./mode')

// Caminho para a pasta de páginas e backup
const pagesDir = path.join(__dirname, '..', 'pages', mode)
const backupDir = path.join(__dirname, '..', 'pages-backup')

// Cria o diretório de backup se não existir
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
}

// Função para mover arquivos e diretórios para o backup
function movePagesToBackup(dir, backupRoot) {
    const files = fs.readdirSync(dir)

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const filePath = path.join(dir, file)
        const backupPath = path.join(backupRoot, path.relative(pagesDir, filePath))

        try {
            const stats = fs.statSync(filePath)

            if (stats.isDirectory()) {
                // Cria o diretório de backup correspondente
                if (!fs.existsSync(backupPath)) {
                    fs.mkdirSync(backupPath, { recursive: true })
                }
                // Recurse em subdiretórios
                movePagesToBackup(filePath, backupRoot)
            } else if (stats.isFile()) {
                fs.renameSync(filePath, backupPath)
                console.log(`Moved to backup: ${filePath}`)
            }
        } catch (error) {
            console.error(`Error moving file ${filePath}: ${error.message}`)
        }
    }
}

movePagesToBackup(pagesDir, backupDir)
