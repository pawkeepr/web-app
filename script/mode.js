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
    tutor: ['external', 'veterinary'],
    external: ['tutor', 'veterinary'],
    vet: ['tutor', 'external'],
}

/**
 * @typedef {string[]} Mode
 */
module.exports = /** @type {ModeProfile} */ (
    MODE_PROFILE[process.env.MODE_PROFILE || 'tutor']
)
