import type { Preview } from '@storybook/react'

// CSS imports
import '~/globals.scss'
import '~/tailwind.css'

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
}

export default preview
