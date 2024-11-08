import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SwitchControl from './switch-control'

describe('Test SwitchControl component (Unit)', () => {
    it('should render the switch and label', () => {
        render(<SwitchControl>Toggle Switch</SwitchControl>)
        expect(screen.getByLabelText('Toggle Switch')).toBeInTheDocument()
        expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('should assign a unique ID to the switch', () => {
        render(<SwitchControl>Toggle Switch</SwitchControl>)
        const switchElement = screen.getByRole('switch')
        const labelElement = screen.getByLabelText('Toggle Switch')
        expect(switchElement.id).toBeTruthy()

        expect(labelElement).toHaveAttribute('id', switchElement.id)
    })
})
