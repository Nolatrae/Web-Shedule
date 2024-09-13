import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ParserController } from './parser.controller'
import { ParserService } from './parser.service'

@Module({
	controllers: [ParserController],
	providers: [ParserService, PrismaService],
	exports: [ParserService],
})
export class ParserModule {}
