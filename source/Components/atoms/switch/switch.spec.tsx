import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import SwitchToggle from './switch'

describe('SwitchToggle component (Unit)', () => {
    it('should call the onChange callback when clicked', () => {
        const handleChange = vi.fn()
        render(<SwitchToggle onChange={handleChange} data-testid="toggle" />)
        const switchToggle = screen.getByTestId('toggle')

        fireEvent.click(switchToggle)

        expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('should render the "Sim" text when enabled', () => {
        render(<SwitchToggle checked={true} data-testid="toggle" />)
        const simText = screen.getByText('Sim')
        const container = screen.getByTestId('toggle')
        expect(simText).toBeInTheDocument()
        expect(container).toHaveClass('bg-opacity-100')
    })

    it('should be disabled when mode is readonly', () => {
        render(<SwitchToggle mode="readonly" data-testid="toggle" />)
        const switchToggle = screen.getByTestId('toggle')
        expect(switchToggle).toBeDisabled()
        expect(switchToggle).toHaveClass(
            'disabled:cursor-not-allowed disabled:opacity-50',
        )
    })

    it('should render the "Não" text when disabled', () => {
        render(<SwitchToggle checked={false} data-testid="toggle" />)
        const naoText = screen.getByText('Não')
        const container = screen.getByTestId('toggle')
        expect(naoText).toBeInTheDocument()
        expect(container).toHaveClass('bg-opacity-50')
    })

    it('should apply the primary color class when color is set to primary', () => {
        render(<SwitchToggle color="primary" checked={true} data-testid="toggle" />)
        const switchToggle = screen.getByTestId('toggle')
        expect(switchToggle).toHaveClass('bg-primary-500')
    })

    it('should apply the secondary color class when color is set to secondary', () => {
        render(
            <SwitchToggle color="secondary" checked={true} data-testid="toggle" />,
        )
        const switchToggle = screen.getByTestId('toggle')
        expect(switchToggle).toHaveClass('bg-secondary-500')
    })

    it('should toggle state when clicked', async () => {
        render(<SwitchToggle checked={false} data-testid="toggle" />)
        const switchToggle = screen.getByTestId('toggle')

        // Initial state: "Não"
        expect(screen.getByText('Não')).toBeInTheDocument()

        // Click to change state
        await userEvent.click(switchToggle)

        // State should now be "Sim"
        expect(screen.getByText('Sim')).toBeInTheDocument()
    })
})
