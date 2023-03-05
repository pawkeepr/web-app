import { render, screen } from '@testing-library/react';
import { describe, expect, it, } from 'vitest';

import PasswordRules from './password-rules';

describe('PasswordRules component', () => {

    it('should match snapshot (Unit)', () => {
        const { container } = render(<PasswordRules value="abcd1234" />)

        expect(container).toMatchSnapshot()
    })

    it('renders password rules list (Unit)', () => {
        render(<PasswordRules value="" />);
        const passLength = screen.getByText(/Mínimo 8 caracteres/i);
        expect(passLength).toBeInTheDocument();
        const passLower = screen.getByText(/Uma letra minúscula/i);
        expect(passLower).toBeInTheDocument();
        const passUpper = screen.getByText(/Uma letra maiúscula/i);
        expect(passUpper).toBeInTheDocument();
        const passNumber = screen.getByText(/Um número/i);
        expect(passNumber).toBeInTheDocument();
    });

    it('validates password length (Unit)', () => {
        render(<PasswordRules value="test" />);
        const passLength = screen.getByText(/Mínimo 8 caracteres/i);
        expect(passLength).toHaveClass('text-danger');
    });

    it('validates lowercase letters in password (Unit)', () => {
        render(<PasswordRules value="TEST1234" />);
        const passLower = screen.getByText(/Uma letra minúscula/i);
        expect(passLower).toHaveClass('text-danger');
    });

    it('validates uppercase letters in password (Unit)', () => {
        render(<PasswordRules value="test1234" />);
        const passUpper = screen.getByText(/Uma letra maiúscula/i);
        expect(passUpper).toHaveClass('text-danger');
    });

    it('validates numbers in password (Unit)', () => {
        render(<PasswordRules value="testTEST" />);
        const passNumber = screen.getByText(/Um número/i);
        expect(passNumber).toHaveClass('text-danger');
    });

    it('validates password meets all requirements (Unit)', () => {
        render(<PasswordRules value="testTEST1234" />);
        const passLength = screen.getByText(/Mínimo 8 caracteres/i);
        expect(passLength).toHaveClass('text-success');
        const passLower = screen.getByText(/Uma letra minúscula/i);
        expect(passLower).toHaveClass('text-success');
        const passUpper = screen.getByText(/Uma letra maiúscula/i);
        expect(passUpper).toHaveClass('text-success');
        const passNumber = screen.getByText(/Um número/i);
        expect(passNumber).toHaveClass('text-success');
    });

    it('should render correctly (Unit)', () => {
        render(<PasswordRules value="" />);
        expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Senha deve conter:');
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should display the correct password rules based on the input value (Unit)', () => {
        const { rerender } = render(<PasswordRules value="" />);

        const passLength = screen.getByTestId(/pass-length/);
        const passLower = screen.getByTestId(/pass-lower/);
        const passUpper = screen.getByTestId(/pass-upper/);
        const passNumber = screen.getByTestId(/pass-number/);

        expect(passLength).toHaveClass('text-danger');
        expect(passLower).toHaveClass('text-danger');
        expect(passUpper).toHaveClass('text-danger');
        expect(passNumber).toHaveClass('text-danger');

        rerender(<PasswordRules value="senhaValida1" />);

        expect(screen.getByText('Mínimo 8 caracteres')).toHaveClass('text-success');
        expect(screen.getByText('Uma letra minúscula (a-z)')).toHaveClass('text-success');
        expect(screen.getByText('Uma letra maiúscula (A-Z)')).toHaveClass('text-success');
        expect(screen.getByText('Um número (0-9)')).toHaveClass('text-success');
    });
});
