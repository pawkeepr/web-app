const fs = require('node:fs')
const path = require('node:path')
const mode = require('./mode')
// Caminho para a pasta de backup e original
const backupDir = path.join(__dirname, '..', 'pages-backup')
const pagesDir = path.join(__dirname, '..', 'pages', mode)

// Cria o diretório original se não existir
if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true })
}

// Função para restaurar arquivos e diretórios do backup
function restorePagesFromBackup(dir, restoreRoot) {
    const files = fs.readdirSync(dir)

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const filePath = path.join(dir, file)
        const restorePath = path.join(
            restoreRoot,
            path.relative(backupDir, filePath),
        )

        try {
            const stats = fs.statSync(filePath)

            if (stats.isDirectory()) {
                // Cria o diretório de restauração correspondente
                if (!fs.existsSync(restorePath)) {
                    fs.mkdirSync(restorePath, { recursive: true })
                }
                // Recurse em subdiretórios
                restorePagesFromBackup(filePath, restoreRoot)
            } else if (stats.isFile()) {
                fs.renameSync(filePath, restorePath)
                console.log(`Restored: ${filePath}`)
            }
        } catch (error) {
            console.error(`Error restoring file ${filePath}: ${error.message}`)
        }
    }

    // Remove o diretório de backup
    if (fs.existsSync(backupDir)) {
        fs.rmSync(backupDir, { recursive: true })
    }
}

restorePagesFromBackup(backupDir, pagesDir)
