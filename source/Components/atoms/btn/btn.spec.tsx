import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Btn } from './btn'

import * as stories from './btn.stories'

const { Primary } = composeStories(stories)

describe('Test Stories Btn component (Unit)', () => {
    it('should render the primary button', async () => {
        await Primary.run({
            args: {
                label: 'Click me',
            },
        })
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })
})

describe('Test Btn component (Unit)', () => {
    it('should render the button with label', () => {
        render(<Btn label="Click me" />)
        expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('should render the button with icon', () => {
        render(<Btn icon={<span>🚀</span>} />)
        expect(screen.getByText('🚀')).toBeInTheDocument()
    })

    it('should render the button with custom class', () => {
        render(<Btn className="custom-btn" data-testid="btn" />)
        expect(screen.getByTestId('btn')).toHaveClass('custom-btn')
    })

    it('should call onClick handler when clicked', () => {
        const handleClick = vi.fn()
        render(<Btn onClick={handleClick} data-testid="btn" />)
        screen.getByTestId('btn').click()
        expect(handleClick).toHaveBeenCalled()
    })
})
