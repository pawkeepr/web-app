import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FooterAuth from './footer-auth';

describe('Test FooterAuth component', () => {
    it('should render snap footer auth (Unit)', async () => {
        const { asFragment } = render(<FooterAuth />);
        expect(asFragment()).toMatchSnapshot();
    });
    it('should ensure the footer contains the PawKeeprs text (Unit)', async () => {
        render(<FooterAuth />);
        // Verifica se PawKeeprs está no footer
        expect(screen.getByText(/PawKeeprs/i)).toBeInTheDocument();
    })
})