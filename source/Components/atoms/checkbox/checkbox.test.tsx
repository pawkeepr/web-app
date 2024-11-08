import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Checkbox from './checkbox'

describe('Checkbox component (Unit)', () => {
    it('snapshot', () => {
        const { asFragment } = render(<Checkbox />)
        expect(asFragment()).toMatchSnapshot()
    })
    it('should render a checkbox', () => {
        render(<Checkbox />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeInTheDocument()
    })

    it('should render a checkbox with custom class', () => {
        render(<Checkbox className="custom-checkbox" />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toHaveClass('custom-checkbox')
    })

    it('should call onChange handler when clicked', async () => {
        const handleChange = vi.fn()
        render(<Checkbox onChange={handleChange} />)
        const checkbox = screen.getByRole('checkbox')
        await userEvent.click(checkbox)
        expect(handleChange).toHaveBeenCalled()
    })

    it('not should call onChange handler when clicked if disabled', async () => {
        const handleChange = vi.fn()
        render(<Checkbox onChange={handleChange} disabled />)
        const checkbox = screen.getByRole('checkbox')
        await userEvent.click(checkbox)
        expect(handleChange).not.toHaveBeenCalled()
    })

    it('should be checked when checked prop is true', () => {
        render(<Checkbox checked />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
    })

    it('should not be checked when checked prop is false', () => {
        render(<Checkbox checked={false} />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()
    })

    it('should be disabled when disabled prop is true', () => {
        render(<Checkbox disabled />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeDisabled()
    })

    it('should not be disabled when disabled prop is false', () => {
        render(<Checkbox disabled={false} />)
        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeDisabled()
    })
})
