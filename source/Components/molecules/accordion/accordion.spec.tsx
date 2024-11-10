import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Accordion from './accordion'

describe('Accordion component (Unit)', () => {
    it('should render the title and content', () => {
        const title = 'Accordion Title'
        const content = 'Accordion Content'

        render(
            <Accordion title={title}>
                <div>{content}</div>
            </Accordion>,
        )

        const accordionTitle = screen.getByText(title)
        const accordionContent = screen.getByText(content)

        expect(accordionTitle).toBeInTheDocument()
        expect(accordionContent).toBeInTheDocument()
    })

    it.skip('should toggle the content when clicked', async () => {
        const title = 'Accordion Title'
        const content = 'Accordion Content'

        render(
            <Accordion title={title} data-testid="accordion">
                <div>{content}</div>
            </Accordion>,
        )
        
        const accordion = screen.getByTestId('accordion')
        const accordionTitle = screen.getByText(title)
        const accordionContent = screen.getByText(content)

        await userEvent.click(accordion)

        
        expect(accordion).toHaveClass('collapse-open')
        
        await userEvent.click(accordion)

        expect(accordion).not.toHaveClass('collapse-open')
    })

})
