import { modelOptions, prop } from "@typegoose/typegoose";


@modelOptions({ schemaOptions: { collection: 'finmodelIIKKO' } })
export class SredniyChekModel {

	@prop({ type: () => String })
	public departamentid: string

	@prop({ type: () => Array })
	public averageCheck: []

	@prop({ type: () => Array })
	public monthlyCheckCount: []

	@prop({ type: () => Array })
	public dailyCheckCount: []

	@prop({ type: () => Array })
	averageRevenue: []

	@prop({ type: () => Array })
	averageDailyRevenue: []
}