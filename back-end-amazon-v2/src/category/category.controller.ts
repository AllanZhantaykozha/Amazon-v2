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
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	// Получение всех категории
	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	// Получение одной категории по Slug
	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.categoryService.bySlug(slug)
	}

	// Получение одной категории по ID
	@Get(':id')
	@Auth()
	async getById(@Param('id') id: number) {
		return this.categoryService.byId(+id)
	}

	// Обновение категория
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: CategoryDto) {
		return this.categoryService.update(+id, dto)
	}

	// Создание категории
	@HttpCode(200)
	@Auth()
	@Post()
	async create() {
		return this.categoryService.create()
	}

	// Удаление категроии
	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: number) {
		return this.categoryService.delete(+id)
	}
}
