import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Choose, For, If, When } from './tsx-control-statements';

describe('Snap Components (Unit)', () => {
    it('should snap render For (Unit)', () => {
        const items = [1, 2, 3];

        const { asFragment } = render(
            <For items={items}>
                {(item, index) => <li key={index}>{item}</li>}
            </For>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should snap render If (Unit)', () => {
        const { asFragment } = render(
            <If condition={true}>
                <div>test</div>
            </If>,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('should snap render Choose (Unit)', () => {
        const { asFragment } = render(
            <Choose value={1}>
                <When value={1}>
                    <div>test</div>
                </When>
            </Choose>,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});

describe('For component (Unit)', () => {
    it('should render list items', async () => {
        const items = [1, 2, 3];

        render(
            <For items={items}>
                {(item, index) => <li key={index}>{item}</li>}
            </For>,
        );

        const elements = screen.getAllByRole('listitem');
        expect(elements).toHaveLength(3);

        items.forEach((item, index) => {
            expect(elements[index]).toHaveTextContent(item.toString());
        });
    });

    it('should render null for empty items', () => {
        const items: number[] = [];

        render(
            <For items={items}>
                {(item, index) => <div key={index}>{item}</div>}
            </For>,
        );

        expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    });
});

describe('If component (Unit)', () => {
    it('should render element if condition is true', () => {
        render(
            <If condition={true}>
                <div>test</div>
            </If>,
        );

        const element = screen.getByText(/test/i);
        expect(element).toBeInTheDocument();
    });

    it('should render null when condition is false', () => {
        render(
            <If condition={false}>
                <label htmlFor="username">Username</label>
            </If>,
        );

        const element = screen.queryByRole('textbox', {
            name: /test/i,
            hidden: true,
        });
        expect(element).not.toBeInTheDocument();
    });
});

describe('Choose component (Unit)', () => {
    it('should render element when value is matched', () => {
        render(
            <Choose value={1}>
                <When value={1}>
                    <div>test</div>
                </When>
            </Choose>,
        );

        const element = screen.getByText(/test/i);
        expect(element).toBeInTheDocument();
    });

    it('should render null when value is not matched', () => {
        render(
            <Choose value={1}>
                <When value={2}>
                    <div>test</div>
                </When>
            </Choose>,
        );

        const element = screen.queryByText(/test/i);
        expect(element).not.toBeInTheDocument();
    });
});
