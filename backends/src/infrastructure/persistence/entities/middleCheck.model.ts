import { modelOptions, prop } from "@typegoose/typegoose";


@modelOptions({ schemaOptions: { collection: 'middlecheck' } })
export class MiddleCheck {
	@prop({ type: () => String })
	public organization: string

	@prop({ type: () => Array })
	public middlecheck: []

}