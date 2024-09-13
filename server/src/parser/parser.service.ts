import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import * as XLSX from 'xlsx'
import { ParserDto, StudyPlanData } from './types/types'
import { extractWeek } from './utils/createSemesterWeeks'
import { extractDataFromFirstSheet } from './utils/extractDataFromFirstSheet'
import { extractDisciplines } from './utils/extractDisciplines'

@Injectable()
export class ParserService {
	constructor(private prisma: PrismaService) {}

	async createStudyPlan(file: Express.Multer.File, dto: ParserDto) {
		const workbook = XLSX.read(file.buffer, { type: 'buffer' })
		const data: StudyPlanData = extractDataFromFirstSheet(workbook)

		const studyPlan = await this.prisma.studyPlan.create({
			data: {
				title: dto.title,
				groups: {
					create: {
						code: data.code,
						countStudents: 30,
						direction: data.profile,
						formEducation: data.formEducation,
						durationPeriod: 4,
						yearEnrollment: new Date(data.yearEnrollment),
					},
				},
			},
		})

		await this.parsingSemestrs(
			file,
			studyPlan.id,
			dto.start_1,
			dto.end_1,
			dto.start_2,
			dto.end_2,
			dto.start_3,
			dto.end_3,
			dto.start_4,
			dto.end_4
		)

		return studyPlan
	}

	private async createDisciplinesForSemester(
		disciplines: any[],
		semester: string,
		studyPlanId: string
	) {
		const disciplineData = disciplines.map(discipline => ({
			name: discipline.name,
			semester: parseInt(semester, 10), // Преобразуем номер семестра в число
			lecture_hours: discipline.lecture_hours ?? undefined,
			el_lecture_hours: discipline.el_lecture_hours ?? undefined,
			laboratory_hours: discipline.laboratory_hours ?? undefined,
			el_laboratory_hours: discipline.el_laboratory_hours ?? undefined,
			practice_hours: discipline.practice_hours ?? undefined,
			el_practice_hours: discipline.el_practice_hours ?? undefined,
			control: discipline.control ?? undefined,
			studyPlan: {
				connect: { id: studyPlanId }, // Привязка к существующему учебному плану
			},
		}))

		const createdDisciplines = await this.prisma.$transaction(
			disciplineData.map(data => this.prisma.discipline.create({ data }))
		)

		return createdDisciplines
	}

	async parsingSemestrs(
		file: Express.Multer.File,
		studyPlanId: string,
		start_1: number,
		end_1: number,
		start_2: number,
		end_2: number,
		start_3: number,
		end_3: number,
		start_4: number,
		end_4: number
	) {
		const workbook = XLSX.read(file.buffer, { type: 'buffer' })
		const { results, countWeeks } = extractDisciplines(
			workbook,
			start_1,
			end_1,
			start_2,
			end_2,
			start_3,
			end_3,
			start_4,
			end_4
		)

		await this.prisma.semesterWeek.create({
			data: {
				studyPlan: {
					connect: { id: studyPlanId },
				},
				week_1: extractWeek(countWeeks[0]),
				week_2: extractWeek(countWeeks[1]),
				week_3: extractWeek(countWeeks[2]),
				week_4: extractWeek(countWeeks[3]),
				week_5: extractWeek(countWeeks[4]),
				week_6: extractWeek(countWeeks[5]),
				week_7: extractWeek(countWeeks[6]),
				week_8: extractWeek(countWeeks[7]),
			},
		})

		const createdDisciplines = []

		for (const semester in results) {
			const disciplines = results[semester]
			const createdSemesterDisciplines =
				await this.createDisciplinesForSemester(
					disciplines,
					semester,
					studyPlanId
				)

			createdDisciplines.push(...createdSemesterDisciplines)
		}

		return createdDisciplines
	}
}
