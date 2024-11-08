import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Input from './input'

describe('Test Input component (Unit)', () => {
    it('should render the input component with default props', () => {
        render(<Input data-testid="input-element" />)
        const inputElement = screen.getByTestId('input-element')
        expect(inputElement).toBeInTheDocument()
    })

    it('should render the input component with custom placeholder', () => {
        render(<Input placeholder="Custom Placeholder" />)
        const inputElement = screen.getByPlaceholderText('Custom Placeholder')
        expect(inputElement).toBeInTheDocument()
    })

    it('should apply required styles when required prop is true', () => {
        render(<Input required data-testid="input-element" />)
        const inputElement = screen.getByTestId('input-element')
        expect(inputElement).toHaveClass('!border-secondary-500')
    })

    it('should not apply isValid styles when isValid prop is true and required is false', () => {
        render(<Input isValid required={false} data-testid="input-element" />)
        const inputElement = screen.getByTestId('input-element')
        expect(inputElement).not.toHaveClass('!border-primary-500')
    })

    it('should apply isValid styles when isValid prop is true and required is true', () => {
        render(<Input isValid required data-testid="input-element" />)
        const inputElement = screen.getByTestId('input-element')
        expect(inputElement).toHaveClass('!border-primary-500')
    })
})
