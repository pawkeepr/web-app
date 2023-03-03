import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Choose, For, If, When } from './tsx-control-statements';


describe('tsx-control-statements', () => {
    it('should render For (Unit)', () => {
        const items = [1, 2, 3]

        const { asFragment } = render(
            <For items={items}>
                {(item, index) => <div key={index}>{item}</div>}
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

    it('should render null when condition is false (Unit)', async () => {
        render(
            <If condition={false}>
                <label htmlFor="username">Username</label><input id="username" type="text" />
            </If>,
        )


        const element = screen.queryByRole('textbox', { name: /test/i, hidden: true })
        expect(element).not.toBeInTheDocument()

    })

    // it('should render null when value is not matched (Unit)', () => {
    //     const { asFragment } = render(
    //         <Choose value={1}>
    //             <When value={2}>
    //                 <div>test</div>
    //             </When>
    //         </Choose>,
    //     )

    //     expect(asFragment()).toMatchSnapshot()
    //     expect(asFragment()).toBeNull()
    // })

})    
