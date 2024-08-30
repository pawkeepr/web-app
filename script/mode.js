require('dotenv').config()

const MODE_PROFILE = {
    tutor: 'tutor',
    external: 'external',
    vet: 'veterinary',
}

module.exports = MODE_PROFILE[process.env.MODE_PROFILE]
