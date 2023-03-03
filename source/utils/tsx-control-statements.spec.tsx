import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Choose, For, If, When } from './tsx-control-statements';


describe('tsx-control-statements', () => {
    it('should render For (Unit)', () => {
        const items = [1, 2, 3]

        const { asFragment } = render(
            <For items={items}>
                {(item, index) => <li key={index}>{item}</li>}
            </For>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('should render If (Unit)', () => {
        const { asFragment } = render(
            <If condition={true}>
                <div>test</div>
            </If>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('should render Choose (Unit)', () => {
        const { asFragment } = render(
            <Choose value={1}>
                <When value={1}>
                    <div>test</div>
                </When>
            </Choose>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('should render null for items is empty (Unit) (WARNING: Teste sem utilidade, necessita corrigir)', () => {
        const items: number[] = []

        render(
            <For items={items}>
                {(item, index) => <div key={index}>{item}</div>}
            </For>,
        )
        // possível correção, contar elementos com a role "listitem"
        expect(screen.queryByText(/test/i)).not.toBeInTheDocument()
    })

    it('should render null when condition is false (Unit)', async () => {
        render(
            <If condition={false}>
                <label htmlFor="username">Username</label>
            </If>,
        )


        const element = screen.queryByRole('textbox', { name: /test/i, hidden: true })
        expect(element).not.toBeInTheDocument()

    })

    it('should render null when value is not matched (Unit)', () => {
        render(
            <Choose value={1}>
                <When value={2}>
                    <div>test</div>
                </When>
            </Choose>,
        )

        const element = screen.queryByText(/test/i)
        expect(element).not.toBeInTheDocument()
    })

    it('should render element when value is matched (Unit)', () => {
        render(
            <Choose value={1}>
                <When value={1}>
                    <div>test</div>
                </When>
            </Choose>,
        )

        const element = screen.getByText(/test/i)
        expect(element).toBeInTheDocument()
    })

    it('should render element if condition is true (Unit)', () => {
        render(
            <If condition={true}>
                <div>test</div>
            </If>,
        )

        const element = screen.getByText(/test/i)
        expect(element).toBeInTheDocument()
    })

    it('should render list items (Unit)', async () => {
        const items = [1, 2, 3]

        render(
            <For items={items}>
                {(item, index) => <li key={index}>{item}</li>}
            </For>,
        )

        const elements = screen.getAllByRole('listitem')
        expect(elements).toHaveLength(3)

        items.forEach((item, index) => {
            expect(elements[index]).toHaveTextContent(item.toString())
        })

    })
})    
