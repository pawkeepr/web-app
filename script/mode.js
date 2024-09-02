require('dotenv').config()

/**
 * @description
 * MODE_PROFILE serve para definir quais páginas devem ser renderizadas para cada perfil.
 * O array de cada chave é o inverso do que se espera, pois ele define quais páginas
 * NÃO devem ser renderizadas para aquele perfil.
 * Por exemplo, o perfil de tutor não deve renderizar as páginas de 'external' e 'veterinary'.
 * @typedef {Object.<string, string[]>} ModeProfile
 */
const MODE_PROFILE = {
    tutor: ['e', 'v'],
    external: ['t', 'v'],
    vet: ['t', 'e'],
}

/**
 * @typedef {string[]} Mode
 */

if (!process.env.MODE_PROFILE) {
    throw new Error('MODE_PROFILE is required')
}

module.exports = /** @type {ModeProfile} */ (MODE_PROFILE[process.env.MODE_PROFILE])
