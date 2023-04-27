import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Formik } from 'formik';
import ListBoxTailwind, { ListBoxTailwindProps } from './list-box-tailwind';


const wrapper = (children: React.ReactNode | JSX.Element) => (
    <Formik initialValues={{}} onSubmit={() => { }}>
        {children}
    </Formik>
)

const sampleItems = [
    { value: 1, name: 'Item 1' },
    { value: 2, name: 'Item 2' },
    { value: 3, name: 'Item 3' },
]

const defaultProps: ListBoxTailwindProps<{}> = {
    items: sampleItems,
    name: 'test-listbox',
}

describe('List Box Tailwind (Unit)', () => {

    it('should match snapshot', () => {
        const { container } = render(wrapper(<ListBoxTailwind items={[]} name='pet' />))

        expect(container).toMatchSnapshot()
    })

    it('should match snapshot with options', async () => {
        const { container } = render(wrapper(<ListBoxTailwind items={sampleItems} name='pet' />))

        const button = screen.getByTestId('list-box-tailwind')

        userEvent.click(button)

        await new Promise((resolve) => setTimeout(resolve, 500))

        expect(container).toMatchSnapshot()

    })

    it('should render label', async () => {
        render(wrapper(<ListBoxTailwind items={[]} name='pet' label='Pet' />))

        expect(screen.getByText('Pet')).toBeInTheDocument()
    })

    it('should disables the ListBoxTailwind component when disabled prop is true', async () => {
        render(wrapper(<ListBoxTailwind {...defaultProps} disabled />))

        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
    })

    it('should renders the ListBoxTailwind component with a placeholder', async () => {
        const placeholder = 'Select an item'
        render(wrapper(<ListBoxTailwind {...defaultProps} placeholder={placeholder} />))

        expect(screen.getByText(placeholder)).toBeInTheDocument()
    })

    it('renders the ListBoxTailwind component with the given items', async () => {
        render(wrapper(<ListBoxTailwind {...defaultProps} />))

        const button = screen.getByTestId('list-box-tailwind')

        userEvent.click(button)

        await waitFor(() => {
            sampleItems.forEach((item) => {
                expect(screen.getByText(item.name)).toBeInTheDocument()
            })
        }, { timeout: 500 })

    })

    it('selects an item from the ListBoxTailwind component', async () => {
        render(wrapper(<ListBoxTailwind {...defaultProps} />))
        const button = screen.getByTestId('list-box-tailwind')
        userEvent.click(button)

        await waitFor(() => {
            const optionToSelect = screen.getByTestId('list-box-tailwind-options')
            expect(optionToSelect).toBeInTheDocument()
        }, { timeout: 200 })
    })

})

describe('List Box Tailwind Hooks (Unit)', () => {
    it('should call onChange when an item is selected', async () => {
        const onChange = vi.fn()
        render(wrapper(<ListBoxTailwind {...defaultProps} onChangeOption={onChange} />))

        const button = screen.getByTestId('list-box-tailwind')
        userEvent.click(button)

        await new Promise((resolve) => setTimeout(resolve, 500))

        const optionToSelect = screen.getByTestId('list-box-tailwind-options-0')
        userEvent.click(optionToSelect)

        await new Promise((resolve) => setTimeout(resolve, 500))
        expect(onChange).toHaveBeenCalled()
    })


})