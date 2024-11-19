import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from 'bcryptjs';

@Injectable()
export class AuthTokenServise {

	constructor(
		private readonly jwtService: JwtService
	) { }
	async getJwtToken(name: string) {
		console.log('namee', name, process.env.SESSION_SECRET);

		return await this.jwtService.signAsync(
			{
				name
			},
			{
				secret: process.env.SESSION_SECRET,
			}
		)

	}

}