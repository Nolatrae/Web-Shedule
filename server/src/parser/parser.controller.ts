import {
	Body,
	Controller,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ParserService } from './parser.service'

@Controller('parser')
export class ParserController {
	constructor(private readonly parserService: ParserService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@Auth('ADMIN')
	async parse(@UploadedFile() file: Express.Multer.File, @Body() dto) {
		return this.parserService.createStudyPlan(file, dto)
	}

	// @Post('/semester')
	// @UseInterceptors(FileInterceptor('file'))
	// @Auth('ADMIN')
	// async parseSemestr(@UploadedFile() file: Express.Multer.File, @Body() dto) {
	// 	return this.parserService.parsingSemestrs(file, dto)
	// }
}
