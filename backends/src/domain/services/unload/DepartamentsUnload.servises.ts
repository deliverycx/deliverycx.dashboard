import { Injectable } from "@nestjs/common";
import { getMonthDateRange } from "src/application/helpers/FormateDate";
import { Maybe } from "src/application/helpers/Monadas";
import { toJsonConvector } from "src/infrastructure/libs/toJsonConvector";
import { IIkkoDeliveryRequest } from "src/infrastructure/services/api/iikko/iikkoDelivery.request";
import { IIkkoRestoRequest } from "src/infrastructure/services/api/iikko/iikkoResto.request";
import { UnloadServises } from "./Unload.servises";

@Injectable()
export class DepartamentsUnloadServises extends UnloadServises {
	constructor(
		private readonly iikkoRequest: IIkkoRestoRequest,
		private readonly iikkoDeliveryRequest: IIkkoDeliveryRequest
	) {
		super()
	}



	async getDepartametsFromIIKKO() {
		const resultDepartametsResto = await this.iikkoRequest.dapartaments()
		interface GroupObject {
			groupDtoes?: {
				groupDto?: any;
			};
		}
		const result: GroupObject = await toJsonConvector(resultDepartametsResto)
		const resultMybe = Maybe.of(result)
			.map(o => o.groupDtoes)
			.map(groupDtoes => groupDtoes?.groupDto)
			.map(groupDto => Array.isArray(groupDto))
			.getValue();
		if (resultMybe) {
			const deportamens = result.groupDtoes.groupDto
			return deportamens.map((value: { name: string, departmentId: string }) => {
				return {
					name: value.name,
					departmentId: value.departmentId
				}
			})
		} else {
			return null
		}
	}

	async getSredniychekFromIIKKO(mounth: string) {
		const [year, mount] = this.dateSplitMounth(mounth)
		const { start, end } = getMonthDateRange(year, mount)
		console.log(start, end);
		const resultChek = await this.iikkoRequest.sredniychek(start, end)

		return resultChek
	}


	async getSredniychekMouthFromIIKKO(mounth: string) {
		const [year, mount] = this.dateSplitMounth(mounth)
		/*
		const { start, end } = getMonthDateRange(year, mount)
		const resultChek = await this.iikkoRequest.sredniychekMouth(start, end)
		return {
			date: start,
			mass: resultChek
		}
		*/
		return await this.dataMouthFromIIKKO((start, end) => this.iikkoRequest.sredniychekMouth(start, end), { year: year, mouth: mount })
	}

	async vyruchkaMounthFromIIKKO(mounth: string) {
		const [year, mount] = this.dateSplitMounth(mounth)
		return await this.dataMouthFromIIKKO((start, end) => this.iikkoRequest.vyruchkaMounth(start, end), { year: year, mouth: mount })
	}
}


