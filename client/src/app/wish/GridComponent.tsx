'use client'

import React, { useCallback, useMemo, useState } from 'react'
import GridCell from './GridCell'
import GridHeaders from './GridHeaders'
import NotesField from './NotesField'
import PopperMenu from './PopperMenu'
import SaveButton from './SaveButton'
import WeekToggle from './WeekToggle'
import { daysOfWeek, hoursOfDay } from './const'

const options = ['Математика', 'Физика', 'Химия']

const GridComponent: React.FC = () => {
	// Хранение данных для четной и нечетной недели отдельно
	const [selectedCells, setSelectedCells] = useState<{
		[e: string]: {
			[dayHour: string]: string | undefined
		}
	}>({
		even: {},
		odd: {},
	})

	const [isEvenWeek, setIsEvenWeek] = useState(true) // Четная или нечетная неделя

	const [popperInfo, setPopperInfo] = useState<{
		anchorEl: HTMLElement | null
		open: boolean
		day: string | null
		hour: string | null
	}>({ anchorEl: null, open: false, day: null, hour: null })

	const [notes, setNotes] = useState('') // Состояние для пожеланий

	const handleCellClick = useCallback(
		(day: string, hour: string) => {
			const key = `${day}-${hour}`
			setSelectedCells(prev => {
				const weekKey = isEvenWeek ? 'even' : 'odd'
				const updatedCells = { ...prev[weekKey] }
				if (updatedCells[key] !== undefined) {
					delete updatedCells[key]
				} else {
					updatedCells[key] = ''
				}
				return { ...prev, [weekKey]: updatedCells }
			})
		},
		[isEvenWeek]
	)

	const handleButtonClick = useCallback(
		(event: React.MouseEvent<HTMLElement>, day: string, hour: string) => {
			event.stopPropagation()
			setPopperInfo({
				anchorEl: event.currentTarget,
				open: true,
				day,
				hour,
			})
		},
		[]
	)

	const handleOptionClick = useCallback(
		(option: string) => {
			if (popperInfo.day && popperInfo.hour) {
				const key = `${popperInfo.day}-${popperInfo.hour}`
				const weekKey = isEvenWeek ? 'even' : 'odd'
				setSelectedCells(prev => ({
					...prev,
					[weekKey]: {
						...prev[weekKey],
						[key]: option,
					},
				}))
			}
			handleClose()
		},
		[popperInfo.day, popperInfo.hour, isEvenWeek]
	)

	const handleClose = useCallback(() => {
		setPopperInfo({
			anchorEl: null,
			open: false,
			day: null,
			hour: null,
		})
	}, [])

	const handleToggleWeek = useCallback(() => {
		setIsEvenWeek(prev => !prev)
	}, [])

	const handleSave = useCallback(() => {
		console.log('Выбранные данные:', selectedCells)
		console.log('Пожелания:', notes)
	}, [selectedCells, notes])

	const handleNotesChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>) => {
			setNotes(event.target.value)
		},
		[]
	)

	const currentWeekKey = isEvenWeek ? 'even' : 'odd'
	const hourCells = useMemo(
		() =>
			hoursOfDay.map((hour, index) => (
				<React.Fragment key={index}>
					<div className='bg-gray-200 text-center py-2 text-xs sm:text-sm'>
						{hour}
					</div>
					{daysOfWeek.map((day, idx) => {
						const key = `${day}-${hour}`
						const selectedOption = selectedCells[currentWeekKey]?.[key]

						return (
							<GridCell
								key={idx}
								day={day}
								hour={hour}
								selectedOption={selectedOption}
								onCellClick={handleCellClick}
								onButtonClick={handleButtonClick}
							/>
						)
					})}
				</React.Fragment>
			)),
		[selectedCells, handleCellClick, handleButtonClick, currentWeekKey]
	)

	return (
		<>
			<div className='p-4'>
				<WeekToggle isEvenWeek={isEvenWeek} onToggle={handleToggleWeek} />
				<div className='grid grid-cols-7 sm:grid-cols-7 gap-2'>
					<GridHeaders daysOfWeek={daysOfWeek} />
					{hourCells}
					<PopperMenu
						anchorEl={popperInfo.anchorEl}
						open={popperInfo.open}
						options={options}
						onOptionClick={handleOptionClick}
						onClose={handleClose}
					/>
				</div>
				<NotesField notes={notes} onChange={handleNotesChange} />
				<SaveButton onSave={handleSave} />
			</div>
		</>
	)
}

export default GridComponent
