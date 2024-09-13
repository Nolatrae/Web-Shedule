import React, { memo } from 'react'

interface GridHeadersProps {
	daysOfWeek: string[]
}

const GridHeaders: React.FC<GridHeadersProps> = memo(({ daysOfWeek }) => {
	return (
		<>
			<div className='bg-gray-200'></div>
			{daysOfWeek.map((day, index) => (
				<div key={index} className='bg-gray-200 text-center py-2'>
					{day}
				</div>
			))}
		</>
	)
})

export default GridHeaders
