const path = require('node:path')
const fs = require('node:fs')
/**
 * @typedef {string[]} Mode
 */
const mode = /** @type {Mode} */ (require('./mode'))

for (let i = 0; i < mode?.length; i++) {
    const modeName = mode[i]
    const pagesDir = path.join(__dirname, '..', 'pages', modeName)
    const backupDir = path.join(__dirname, '..', 'pages-backup', modeName)
    try {
        fs.cpSync(pagesDir, backupDir, { recursive: true, force: true })
        fs.rmSync(pagesDir, { recursive: true, force: true })
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Diretório ${pagesDir} não encontrado`)
        } else {
            throw error
        }
    }
}

console.log('Done!')
