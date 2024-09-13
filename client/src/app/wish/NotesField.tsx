import React, { ChangeEvent, memo } from 'react'

interface NotesFieldProps {
	notes: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const NotesField: React.FC<NotesFieldProps> = memo(({ notes, onChange }) => {
	return (
		<div className='mt-4 p-4 border border-gray-300 rounded'>
			<label className='block text-lg font-semibold mb-2'>Пожелания:</label>
			<textarea
				className='w-full h-24 border border-gray-300 p-2 rounded mt-4 resize-none sm:h-32'
				value={notes}
				onChange={onChange}
				placeholder='Введите ваши пожелания здесь...'
			/>
		</div>
	)
})

export default NotesField
