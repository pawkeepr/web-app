import type { Preview } from '@storybook/react'
// CSS imports
import { initialize, mswLoader } from 'msw-storybook-addon'
import { withPerformance } from 'storybook-addon-performance'
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
    decorators: [withPerformance],
}

export default preview
