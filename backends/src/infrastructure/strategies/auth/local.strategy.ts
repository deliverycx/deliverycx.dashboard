import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServise } from 'src/domain/services/auth/auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private LoginServises: AuthServise) {
		super({ usernameField: 'name' });
	}

	async validate(username: string, password: string): Promise<any> {
		const user = await this.LoginServises.validateUsers(username, password);

		if (!user) {
			throw new UnauthorizedException()
		}
		return user;
	}
}