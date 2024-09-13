import React, { memo, MouseEvent, useCallback } from 'react'

interface GridCellProps {
	day: string
	hour: string
	selectedOption?: string
	onCellClick: (day: string, hour: string) => void
	onButtonClick: (
		event: MouseEvent<HTMLElement>,
		day: string,
		hour: string
	) => void
}

const GridCell: React.FC<GridCellProps> = memo(
	({ day, hour, selectedOption, onCellClick, onButtonClick }) => {
		const handleCellClick = useCallback(() => {
			onCellClick(day, hour)
		}, [day, hour, onCellClick])

		const handleButtonClick = useCallback(
			(event: MouseEvent<HTMLElement>) => {
				onButtonClick(event, day, hour)
			},
			[day, hour, onButtonClick]
		)

		return (
			<div
				className={`border border-gray-300 cursor-pointer relative p-2 ${
					selectedOption !== undefined ? 'bg-blue-200' : ''
				}`}
				onClick={handleCellClick}
			>
				{selectedOption && <div className='text-center'>{selectedOption}</div>}
				<button
					className='absolute top-1 right-1 p-1 bg-gray-200 rounded-full text-xs'
					onClick={handleButtonClick}
				>
					&#x25BC;
				</button>
			</div>
		)
	}
)

export default GridCell
