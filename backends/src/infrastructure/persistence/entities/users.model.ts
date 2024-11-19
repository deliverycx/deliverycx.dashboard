import { modelOptions, prop } from "@typegoose/typegoose";


@modelOptions({ schemaOptions: { collection: 'users' } })
export class UsersModel {
	@prop({ type: () => String })
	public name: string

	@prop({ type: () => String })
	public password: string

	@prop({ type: () => String })
	public role: string

	@prop({ type: () => String })
	public organization: string

	@prop({ type: () => Array })
	public pagesUser: []

	@prop({ type: () => Array })
	public organizationsUser: []

	@prop({ type: () => String })
	public refreshToken: string

	@prop({ type: () => String })
	public refreshTokenExp: string

}