import { modelOptions, prop } from "@typegoose/typegoose";


@modelOptions({ schemaOptions: { collection: 'finmodel' } })
export class FinModelModel {

	@prop()
	public departamentid: string

	@prop()
	public paramsModel: any
}