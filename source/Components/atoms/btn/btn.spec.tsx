import { composeStories } from '@storybook/react'
import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import * as stories from './btn.stories'

const { Primary: Default } = composeStories(stories)

describe('Test Btn component (Unit)', () => {
    it('should render the button with label', async () => {
        await Default.run({
            args: {
                label: 'Click me',
            },
        })

        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('should render the button with icon', async () => {
        await Default.run({
            args: {
                icon: <span>🚀</span>,
            },
        })
        expect(screen.getByText('🚀')).toBeInTheDocument()
    })

    it('should render the button with custom class', async () => {
        await Default.run({
            args: {
                className: 'custom-btn',
                'data-testid': 'btn',
            },
        })
        expect(screen.getByTestId('btn')).toHaveClass('custom-btn')
    })

    it('should call onClick handler when clicked', async () => {
        const handleClick = vi.fn()
        await Default.run({
            args: {
                'data-testid': 'btn',
                onClick: handleClick,
            },
        })
        screen.getByTestId('btn').click()
        expect(handleClick).toHaveBeenCalled()
    })
})
