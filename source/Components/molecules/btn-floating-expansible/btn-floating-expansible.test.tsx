import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MdPets } from "react-icons/md"
import { describe, expect, it, vi } from 'vitest'
import {
	BtnFloatingExpansible,
	type BtnFloatingExpansibleProps,
} from './btn-floating-expansible'

describe('BtnFloatingExpansible component (Unit)', () => {
	const childLinks: BtnFloatingExpansibleProps['childLinks'] = [
		{
			title: 'Link 1',
			icon: MdPets,
			onClick: vi.fn(),
			href: '/link1',
		},
		{
			title: 'Link 2',
			icon: MdPets,
			onClick: vi.fn(),
			href: '/link2',
		},
	]

	beforeEach(async () => {
		// garantir que o componente está fechado antes de cada teste
		render(<BtnFloatingExpansible childLinks={childLinks} />)
		const buttonElement = screen.getByRole('button')
		await userEvent.click(buttonElement)
		const link1Element = screen.queryByText('Link 1')

		if (!link1Element) {
			return
		}

		await userEvent.click(buttonElement)
		return
	})

	it('renders the button', () => {
		const buttonElement = screen.getByRole('button')
		expect(buttonElement).toBeInTheDocument()
	})

	it('renders the child links when the button is clicked', async () => {
		const buttonElement = screen.getByRole('button')
		await userEvent.click(buttonElement)
		const link1Element = screen.getByText('Link 1')
		const link2Element = screen.getByText('Link 2')
		expect(link1Element).toBeVisible()
		expect(link2Element).toBeVisible()
	})

	it('calls the onClick function when a child link is clicked', async () => {
		const buttonElement = screen.getByRole('button')
		await userEvent.click(buttonElement)
		const link1Element = screen.getByText('Link 1')
		await userEvent.click(link1Element)
		expect(childLinks[0].onClick).toHaveBeenCalled()
	})
})
