import { BuildingType, RoomType } from '@prisma/client'
import { IsEnum, IsNumber, IsString } from 'class-validator'
export class RoomDto {
	@IsEnum(RoomType)
	typeRoom: RoomType

	@IsEnum(BuildingType)
	typeBuilding: BuildingType

	@IsNumber()
	numberSeats: number

	@IsString({ each: true })
	equipment: string[]
}
