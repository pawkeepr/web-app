import type { Preview } from '@storybook/react'
// CSS imports
import { initialize, mswLoader } from 'msw-storybook-addon'
import '~/globals.scss'
import '~/tailwind.css'

// Initialize MSW
initialize()

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

    tags: ['autodocs'],
    loaders: [mswLoader],
}

export default preview
