import { Controller, Get } from '@nestjs/common'
import { HttpCode } from '@nestjs/common/decorators'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { StatisticsService } from './statistics.service'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Get('Main')
	@Auth()
	@HttpCode(200)
	async Main(@CurrentUser('id') id: string) {
		return this.statisticsService.getMain(+id)
	}
}
