import { Module } from "@nestjs/common";
import { DepartamentsUnloadModule } from "./departamentsUnload.module";

@Module({
	imports: [
		DepartamentsUnloadModule
	]
})
export class UndloadModule { }