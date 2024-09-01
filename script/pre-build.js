const path = require('node:path')
const movePages = require('./move-pages')
const fs = require('node:fs')
/**
 * @typedef {string[]} Mode
 */
const mode = /** @type {Mode} */ (require('./mode'))

for (let i = 0; i < mode?.length; i++) {
    const modeName = mode[i]
    const pagesDir = path.join(__dirname, '..', 'pages', modeName)
    const backupDir = path.join(__dirname, '..', 'pages-backup', modeName)
    movePages(pagesDir, backupDir)

    // delete pasta backup e arquivos
    fs.rmSync(pagesDir, { recursive: true, force: true })
}

console.log('Done!')
