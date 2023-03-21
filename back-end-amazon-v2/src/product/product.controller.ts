import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	// Получение всех продуктов
	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() queryDto: GetAllProductDto) {
		return this.productService.getAll(queryDto)
	}

	// Получение продукта по Id
	@Get(':id')
	@Auth()
	async getProduct(@Param('id') id: string) {
		return this.productService.byId(+id)
	}

	// Хуй его знает
	@Get('similar/:slug')
	async getSimilar(@Param('id') id: string) {
		return this.productService.getSimilar(+id)
	}

	// Получение продукта по Slug
	@Get('by-slug/:slug')
	async getProductBySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug)
	}

	// Получение продукта по Category
	@Get('by-category/:categorySlug')
	async getProductByCategory(@Param('categorySlug') categorySlug: string) {
		return this.productService.byCategory(categorySlug)
	}

	// Создание продукта
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async createProduct() {
		return this.productService.create()
	}

	// Обновение продукта
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(+id, dto)
	}

	// Удаление продукта
	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return this.productService.delete(+id)
	}
}
