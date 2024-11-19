import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UsersModel } from 'src/infrastructure/persistence/entities/users.model';
import { AuthorizationControllers } from 'src/controllers/auth/authorization.controllers';
import { UsersRepositories } from 'src/infrastructure/persistence/repositories/users/users.repositories';
import { AuthServise } from 'src/domain/services/auth/auth.service';
import { AuthTokenServise } from 'src/domain/services/auth/authToken.service';
import { ADMIN_DB } from 'src/infrastructure/configuration/config.mongodb';
import { LocalStrategy } from 'src/infrastructure/strategies/auth/local.strategy';
import { JwtStrategy } from 'src/infrastructure/strategies/auth/jwt.stratagy';

@Module({
	imports: [
		TypegooseModule.forFeature([UsersModel], ADMIN_DB),
		ConfigModule,
		JwtModule.register({
			secret: 'cxdelivery',
			signOptions: {
				expiresIn: '30d',
			},
		}),
		PassportModule,
	],
	controllers: [AuthorizationControllers],
	providers: [
		AuthServise,
		AuthTokenServise,
		LocalStrategy,
		JwtStrategy,
		UsersRepositories,
	],
})
export class AuthModule { }
