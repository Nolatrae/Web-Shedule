import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { RoomDto } from './room.dto'

@Injectable()
export class RoomService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string) {
		return this.prisma.room.findUnique({
			where: {
				id,
			},
		})
	}

	async getAll() {
		return this.prisma.room.findMany()
	}

	async create(data: RoomDto) {
		return this.prisma.room.create({
			data,
		})
	}

	async delete(id: string) {
		const room = await this.prisma.room.findUnique({
			where: {
				id,
			},
		})

		if (!room) throw new Error('Room not found')

		return this.prisma.room.delete({
			where: {
				id,
			},
		})
	}

	async update(id: string, data: RoomDto) {
		const room = await this.prisma.room.findUnique({
			where: {
				id,
			},
		})

		if (!room) throw new Error('Room not found')

		return this.prisma.room.update({
			where: {
				id,
			},
			data,
		})
	}
}
