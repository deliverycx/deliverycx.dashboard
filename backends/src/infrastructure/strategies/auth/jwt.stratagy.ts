import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			ignoreExpiration: true,
			secretOrKey: process.env.SESSION_SECRET,
			jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
				let data = request?.cookies["auth-cookie-dasbord"];
				if (!data) {
					return null;
				}
				return data.token
			}])
		});
	}

	async validate(payload: any) {
		if (payload === null) {
			throw new UnauthorizedException();
		}
		return payload;
	}
}