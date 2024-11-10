import type { StorybookConfig } from '@storybook/nextjs'

import { dirname, join } from 'node:path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')))
}
const config: StorybookConfig = {
    stories: ['../source/**/*.mdx', '../source/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

    addons: [
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@chromatic-com/storybook'),
        getAbsolutePath('@storybook/addon-a11y'),
        getAbsolutePath('@abcaustralia/storybook-addon-a11ydocs'),
        getAbsolutePath('@storybook/addon-viewport'),
        getAbsolutePath('@storybook/addon-storysource'),
        getAbsolutePath('@storybook/experimental-addon-test')
    ],

    framework: {
        name: getAbsolutePath('@storybook/nextjs'),
        options: {},
    },

    staticDirs: ['../public'],

    docs: {
        autodocs: true,
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
}
export default config
