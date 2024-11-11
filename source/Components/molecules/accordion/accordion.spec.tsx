import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Accordion from './accordion'

describe('Accordion component (Unit)', () => {
    it('should toggle the content when clicked', async () => {
        const title = 'Accordion Title'
        const content = 'Accordion Content'

        render(
            <Accordion title={title} data-testid="accordion">
                <div>{content}</div>
            </Accordion>,
        )

        const accordionTitle = screen.getByText(title)
        const accordionContent = screen.getByText(content)

        expect(accordionTitle).toBeInTheDocument()
        expect(accordionContent).not.toBeVisible()

        await userEvent.click(accordionTitle)

        expect(accordionContent).toBeVisible()
    })
})
