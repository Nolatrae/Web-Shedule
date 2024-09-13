import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RoomModule } from './Room/room.module'
import { AuthModule } from './auth/auth.module'
import { ParserModule } from './parser/parser.module'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, RoomModule, ParserModule],
})
export class AppModule {}
