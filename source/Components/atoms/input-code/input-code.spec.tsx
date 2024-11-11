import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import InputCode from './input-code'

describe('InputCode component (Unit)', () => {
    it('renders input field with correct props', () => {
        render(
            <InputCode moveToNext={() => { }} id="code" data-testid="input-code" />,
        )
        const inputElement = screen.getByTestId('input-code')
        expect(inputElement).toBeInTheDocument()
        expect(inputElement).toHaveAttribute('type', 'number')
        expect(inputElement).toHaveAttribute('id', 'code')
    })

    it('no calls moveToNext function on key up if key is not a number', async () => {
        const moveToNextMock = vi.fn()
        render(
            <InputCode
                moveToNext={moveToNextMock}
                id="code"
                data-testid="input-code"
            />,
        )
        const inputElement = screen.getByTestId('input-code')
        await userEvent.type(inputElement, 'a')
        expect(moveToNextMock).not.toHaveBeenCalled()
    })

    it('calls moveToNext function on key up', async () => {
        const moveToNextMock = vi.fn()
        render(
            <InputCode
                moveToNext={moveToNextMock}
                id="code"
                data-testid="input-code"
            />,
        )
        const inputElement = screen.getByTestId('input-code')
        await userEvent.type(inputElement, '123')
        expect(moveToNextMock).toHaveBeenCalledTimes(3)
    })

    it('limits input to a single character', async () => {
        render(
            <InputCode moveToNext={() => { }} id="code" data-testid="input-code" />,
        )
        const inputElement = screen.getByTestId('input-code') as HTMLInputElement
        await userEvent.type(inputElement, '123')
        expect(inputElement.value).toBe('3')
    })

    // Add more tests as needed
})
