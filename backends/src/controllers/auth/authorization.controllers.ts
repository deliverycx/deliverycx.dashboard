import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthServise } from 'src/domain/services/auth/auth.service';
import { AuthTokenServise } from 'src/domain/services/auth/authToken.service';
import { Response } from 'express';

@Controller('authorization')
export class AuthorizationControllers {
	constructor(
		private readonly authServise: AuthServise,
		private readonly authTokenServise: AuthTokenServise,
	) { }

	@UseGuards(AuthGuard('local'))
	@Post('login')
	async signIn(@Req() req, @Res({ passthrough: true }) res: Response) {
		const token = await this.authTokenServise.getJwtToken(req.body.name);
		const user = await this.authServise.getUser(req.body.name)
		res.cookie(
			'auth-cookie-dasbord',
			{ token },
			{
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				expires: new Date(Date.now() + 40 * 24 * 60 * 90000),
			},
		);


		return user
	}
}
