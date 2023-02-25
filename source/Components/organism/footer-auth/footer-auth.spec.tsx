import { cleanup, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FooterAuth from './footer-auth';

afterEach(cleanup)

describe('FooterAuth', () => {
    it('renders', async () => {
        const { baseElement } = render(<FooterAuth />);
        expect(baseElement).toMatchSnapshot();
    });
    it('should ensure the footer contains the PawKeeprs text', async () => {
        render(<FooterAuth />);
        // Verifica se PawKeeprs está no footer
        expect(screen.getByText(/PawKeeprs/i)).toBeTruthy();
    })
})