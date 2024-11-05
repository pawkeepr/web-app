import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import PasswordRules from './password-rules'

describe('PasswordRules component', () => {
    it('should match snapshot (Unit)', () => {
        const { container } = render(<PasswordRules value="abcd1234" />)

        expect(container).toMatchSnapshot()
    })

    it('renders password rules list (Unit)', () => {
        render(<PasswordRules value="" />)
        const passLength = screen.getByText(/Mínimo 8 caracteres/i)
        expect(passLength).toBeInTheDocument()
        const passLower = screen.getByText(/Uma letra minúscula/i)
        expect(passLower).toBeInTheDocument()
        const passUpper = screen.getByText(/Uma letra maiúscula/i)
        expect(passUpper).toBeInTheDocument()
        const passNumber = screen.getByText(/Um número/i)
        expect(passNumber).toBeInTheDocument()
        const passSpecial = screen.getByText(/Um caractere especial/i)
        expect(passSpecial).toBeInTheDocument()
    })

    it('validates password length (Unit)', () => {
        render(<PasswordRules value="test" />)
        const passLength = screen.getByText(/Mínimo 8 caracteres/i)
        expect(passLength).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-gray-500',
        )
    })

    it('validates lowercase letters in password (Unit)', () => {
        render(<PasswordRules value="TEST1234" />)
        const passLower = screen.getByText(/Uma letra minúscula/i)
        expect(passLower).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-gray-500',
        )
    })

    it('validates uppercase letters in password (Unit)', () => {
        render(<PasswordRules value="test1234" />)
        const passUpper = screen.getByText(/Uma letra maiúscula/i)
        expect(passUpper).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-gray-500',
        )
    })

    it('validates numbers in password (Unit)', () => {
        render(<PasswordRules value="testTEST" />)
        const passNumber = screen.getByText(/Um número/i)
        expect(passNumber).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-gray-500',
        )
    })

    it('validates special characters in password (Unit)', () => {
        render(<PasswordRules value="testTEST1234" />)
        const passSpecial = screen.getByText(/Um caractere especial/i)
        expect(passSpecial).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-gray-500',
        )
    })

    it('validates password meets all requirements (Unit)', () => {
        render(<PasswordRules value="testTEST1234@" />)
        const passLength = screen.getByText(/Mínimo 8 caracteres/i)
        expect(passLength).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-primary-500',
        )
        const passLower = screen.getByText(/Uma letra minúscula/i)
        expect(passLower).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-primary-500',
        )
        const passUpper = screen.getByText(/Uma letra maiúscula/i)
        expect(passUpper).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-primary-500',
        )
        const passNumber = screen.getByText(/Um número/i)
        expect(passNumber).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-primary-500',
        )
        const passSpecial = screen.getByText(/Um caractere especial/i)
        expect(passSpecial).toHaveClass(
            'text-xs font-sans font-semibold mr-1 text-primary-500',
        )
    })

    // it('should render correctly (Unit)', () => {
    //     render(<PasswordRules value="" />)
    //     expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
    //         'Senha deve conter:',
    //     )
    //     expect(screen.getByRole('list')).toBeInTheDocument()
    // })

    // it('should display the correct password rules based on the input value (Unit)', () => {
    //     const { rerender } = render(<PasswordRules value="" />)

    //     const passLength = screen.getByTestId(/pass-length/)
    //     const passLower = screen.getByTestId(/pass-lower/)
    //     const passUpper = screen.getByTestId(/pass-upper/)
    //     const passNumber = screen.getByTestId(/pass-number/)
    //     const passSpecial = screen.getByTestId(/pass-special/)

    //     expect(passLength).toHaveClass(
    //         'text-xs font-sans font-semibold mr-1 text-gray-500',
    //     )
    //     expect(passLower).toHaveClass(
    //         'text-xs font-sans font-semibold mr-1 text-gray-500',
    //     )
    //     expect(passUpper).toHaveClass(
    //         'text-xs font-sans font-semibold mr-1 text-gray-500',
    //     )
    //     expect(passNumber).toHaveClass(
    //         'text-xs font-sans font-semibold mr-1 text-gray-500',
    //     )
    //     expect(passSpecial).toHaveClass(
    //         'text-xs font-sans font-semibold mr-1 text-gray-500',
    //     )

    //     rerender(<PasswordRules value="senhaValida1@" />)

    //     expect(screen.getByText('Mínimo 8 caracteres')).toHaveClass('text-xs font-sans font-semibold mr-1 text-primary-500')
    //     expect(screen.getByText('Uma letra minúscula (a-z)')).toHaveClass(
    //         'text-xs font-sans font-semibold mr-1 text-primary-500',
    //     )
    //     expect(screen.getByText('Uma letra maiúscula (A-Z)')).toHaveClass(
    //         'text-xs font-sans font-semibold mr-1 text-primary-500',
    //     )
    //     expect(screen.getByText('Um número (0-9)')).toHaveClass('text-xs font-sans font-semibold mr-1 text-primary-500')
    //     expect(
    //         screen.getByText('Um caractere especial (!@#$%^&*()_+)'),
    //     ).toHaveClass('text-xs font-sans font-semibold mr-1 text-primary-500')
    // })
})
