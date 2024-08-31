const fs = require('node:fs')
const path = require('node:path')

/**
 * @typedef {string[]} Mode
 */
const mode = /** @type {Mode} */ (require('./mode'))

// Função para mover arquivos e diretórios para o backup
function movePagesToBackup(dir, backupRoot) {
    const files = fs.readdirSync(dir)
    // Cria o diretório de backup se não existir
    if (!fs.existsSync(backupRoot)) {
        fs.mkdirSync(backupRoot, { recursive: true })
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const filePath = path.join(dir, file)
        const backupPath = path.join(backupRoot, path.relative(dir, filePath))

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

for (let i = 0; i < mode.length; i++) {
    const modeName = mode[i]
    const pagesDir = path.join(__dirname, '..', 'pages', modeName)
    const backupDir = path.join(__dirname, '..', 'pages-backup', modeName)
    movePagesToBackup(pagesDir, backupDir)
}

console.log('Done!')
