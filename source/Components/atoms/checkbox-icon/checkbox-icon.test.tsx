import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CheckboxIcon from './checkbox-icon'

describe('CheckboxIcon component (Unit)', () => {
    it('should render the checkbox icon', () => {
        render(<CheckboxIcon data-testid="checkbox-icon" />)
        const checkboxIcon = screen.getByTestId('checkbox-icon')
        expect(checkboxIcon).toBeInTheDocument()
    })

    it('should apply the "checked" variant when checked is true', () => {
        render(<CheckboxIcon checked={true} data-testid="checkbox-icon" />)
        const checkboxIcon = screen.getByTestId('checkbox-icon')
        expect(checkboxIcon).toHaveClass('text-primary-500')
    })

    it('should apply the "unchecked" variant when checked is false', () => {
        render(<CheckboxIcon checked={false} data-testid="checkbox-icon" />)
        const checkboxIcon = screen.getByTestId('checkbox-icon')
        expect(checkboxIcon).toHaveClass('text-gray-400')
    })

    it('should apply additional classes', () => {
        render(
            <CheckboxIcon className="custom-class" data-testid="checkbox-icon" />,
        )
        const checkboxIcon = screen.getByTestId('checkbox-icon')
        expect(checkboxIcon).toHaveClass('custom-class')
    })
})
