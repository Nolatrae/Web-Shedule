import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { RoomDto } from './room.dto'
import { RoomService } from './room.service'

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@Get(':id')
	@Auth('ADMIN')
	async getById(@Param('id') id: string) {
		return this.roomService.getById(id)
	}

	@Get()
	@Auth('ADMIN')
	async getAll() {
		return this.roomService.getAll()
	}

	@Post()
	@Auth('ADMIN')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: RoomDto) {
		return this.roomService.create(dto)
	}

	@Put(':id')
	@Auth('ADMIN')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async update(@Param('id') id: string, @Body() dto: RoomDto) {
		return this.roomService.update(id, dto)
	}

	@Delete(':id')
	@Auth('ADMIN')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.roomService.delete(id)
	}
}
