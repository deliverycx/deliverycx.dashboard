import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import {
	ADMIN_DB,
	DASHBORD_DB,
	DELIVERY_DB,
} from 'src/infrastructure/configuration/config.mongodb';
import { AuthModule } from './auth.module';
import { UndloadModule } from './unloads/unloads.module';
import { DepartamentsModule } from './deportaments/deportaments.module';
import { FinModelModule } from './finModel/finModel.module';
import { ChartsModule } from './charts/charts.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: path.resolve(
				__dirname,
				`../../.${process.env.NODE_ENV}.env`,
			),
		}),
		MongooseModule.forRoot(process.env.CONNECTION_1, {
			connectionName: ADMIN_DB,
		}),
		MongooseModule.forRoot(process.env.CONNECTION_2, {
			connectionName: DELIVERY_DB,
		}),
		MongooseModule.forRoot(process.env.CONNECTION_3, {
			connectionName: DASHBORD_DB,
		}),
		AuthModule,
		UndloadModule,
		DepartamentsModule,
		FinModelModule,
		ChartsModule
	],

	providers: [],
})
export class AppModule { }
