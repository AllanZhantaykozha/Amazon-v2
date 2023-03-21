import { IsEmail, IsString, MinLength } from 'class-validator'

export class RefreshDto {
	@IsString()
	refreshToken: string
}
