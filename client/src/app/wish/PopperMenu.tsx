import Popper from '@mui/material/Popper'
import React, { ChangeEvent, memo, useState } from 'react'

interface PopperMenuProps {
	anchorEl: HTMLElement | null
	open: boolean
	options: string[]
	onOptionClick: (option: string) => void
	onClose: () => void
}

const PopperMenu: React.FC<PopperMenuProps> = memo(
	({ anchorEl, open, options, onOptionClick, onClose }) => {
		const [searchTerm, setSearchTerm] = useState('')

		const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(event.target.value)
		}

		const handleClose = () => {
			setSearchTerm('')
			onClose()
		}

		const filteredOptions = options.filter(option =>
			option.toLowerCase().includes(searchTerm.toLowerCase())
		)

		return (
			<Popper
				open={open}
				anchorEl={anchorEl}
				placement='bottom'
				modifiers={[
					{
						name: 'flip',
						enabled: true,
						options: {
							altBoundary: true,
							rootBoundary: 'viewport',
							padding: 8,
						},
					},
					{
						name: 'preventOverflow',
						enabled: true,
						options: {
							altAxis: true,
							altBoundary: true,
							tether: true,
							rootBoundary: 'document',
							padding: 8,
						},
					},
				]}
				onMouseLeave={handleClose}
			>
				<div className='bg-white border border-gray-300 p-2 shadow-lg flex flex-col max-h-72 overflow-y-auto sm:w-60 md:w-80 lg:w-96'>
					<input
						type='text'
						placeholder='Поиск...'
						value={searchTerm}
						onChange={handleSearchChange}
						className='p-2 border border-gray-300 rounded mb-2 w-full'
					/>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option, idx) => (
							<button
								key={idx}
								className='p-2 hover:bg-gray-100 text-left w-full'
								onClick={() => {
									onOptionClick(option)
									handleClose()
								}}
							>
								{option}
							</button>
						))
					) : (
						<div className='p-2 text-gray-500 text-center'>Нет совпадений</div>
					)}
				</div>
			</Popper>
		)
	}
)

export default PopperMenu
