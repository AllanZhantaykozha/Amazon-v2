import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	// Получаем все комментарии
	@Get()
	async getAll() {
		return this.reviewService.getAll()
	}

	// Создание комментария
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('leave/:productId')
	async leaveReview(
		@Param('productId') productId: number,
		@Body() dto: ReviewDto,
		@CurrentUser('id') id: string
	) {
		return this.reviewService.create(+id, dto, +productId)
	}
}
