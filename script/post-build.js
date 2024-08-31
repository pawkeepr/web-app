const path = require('node:path')
const movePages = require('./move-pages')

/**
 * @typedef {string[]} Mode
 */
const mode = /** @type {Mode} */ (require('./mode'))

for (let i = 0; i < mode.length; i++) {
    const modeName = mode[i]
    const pagesDir = path.join(__dirname, '..', 'pages', modeName)
    const backupDir = path.join(__dirname, '..', 'pages-backup', modeName)
    movePages(backupDir, pagesDir)
}

// delete pasta backup e arquivos
const fs = require('node:fs')
const backupDir = path.join(__dirname, '..', 'pages-backup')
fs.rmSync(backupDir, { recursive: true, force: true })

console.log('Done!')
