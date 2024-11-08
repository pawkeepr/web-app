import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import TextArea, { style } from './text-area'

describe('TextArea component (Unit)', () => {
    it('should render the textarea with correct props', () => {
        render(<TextArea name="textarea" placeholder="Enter text" />)
        const textareaElement = screen.getByPlaceholderText('Enter text')
        expect(textareaElement).toBeInTheDocument()
        expect(textareaElement.tagName).toBe('TEXTAREA')
        expect(textareaElement).toHaveAttribute('name', 'textarea')
    })

    it('should apply the correct styles to the textarea', () => {
        render(<TextArea className="custom-class" />)
        const textareaElement = screen.getByRole('textbox')
        expect(textareaElement).toHaveClass(style)
    })

    it('should call onChange function when textarea value changes', async () => {
        const onChange = vi.fn()
        render(<TextArea onChange={onChange} />)
        const textareaElement = screen.getByRole('textbox')
        await userEvent.type(textareaElement, 'New value')
        expect(onChange).toHaveBeenCalled()
    })
})
