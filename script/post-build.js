const fs = require('node:fs')
const path = require('node:path')

/**
 * @typedef {string[]} Mode
 */
const mode = /** @type {Mode} */ (require('./mode'))

for (let i = 0; i < mode.length; i++) {
    const modeName = mode[i]
    const pagesDir = path.join(__dirname, '..', 'pages', modeName)
    const backupDir = path.join(__dirname, '..', 'pages-backup', modeName)
    try {
        fs.cpSync(backupDir, pagesDir, { recursive: true })
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Diretório ${backupDir} não encontrado`)
        } else {
            throw error
        }
    }
}

const backupDir = path.join(__dirname, '..', 'pages-backup')
fs.rmSync(backupDir, { recursive: true, force: true })

console.log('Done!')
