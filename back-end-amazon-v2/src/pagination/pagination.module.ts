import { Module } from '@nestjs/common'
import { PaginationService } from './pagination.service'
import { PrismaService } from 'src/prisma.service'

@Module({
	controllers: [],
	providers: [PaginationService],
	exports: [PaginationService]
})
export class PaginationModule {}
