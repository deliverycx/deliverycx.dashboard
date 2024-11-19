import { modelOptions, prop } from "@typegoose/typegoose";


@modelOptions({ schemaOptions: { collection: 'departaments' } })
export class DeportamentsModel {
	@prop({ type: () => String })
	public departament: string

	@prop({ type: () => String })
	public departamentid: string

	@prop()
	public info: any

	@prop()
	public finmodel: any

	@prop()
	public setting: any

}