import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MdPets } from "react-icons/md"
import { describe, expect, it, vi } from 'vitest'
import { ChildLink } from './btn-child-link'

describe('ChildLink component (Unit)', () => {
	it('renders the link with the correct title', () => {
		const title = 'Test Link'
		render(<ChildLink title={title} href="#" icon={MdPets} />)
		const linkElement = screen.getByTitle(title)
		expect(linkElement).toBeInTheDocument()
	})

	it('renders the link with the correct href', () => {
		const href = '/test'
		render(<ChildLink title="" href={href} icon={MdPets} />)
		const linkElement = screen.getByRole('link')
		expect(linkElement).toHaveAttribute('href', href)
	})

	it('calls the onClick function when the link is clicked', async () => {
		const onClick = vi.fn()
		render(<ChildLink title="" href="#" onClick={onClick} icon={MdPets} />)
		const linkElement = screen.getByRole('link')
		await userEvent.click(linkElement)
		expect(onClick).toHaveBeenCalled()
	})
})