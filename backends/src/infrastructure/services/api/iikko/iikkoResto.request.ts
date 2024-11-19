import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class IIkkoRestoRequest {
	axiosInstance: AxiosInstance

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: `${process.env.IIKKO_API_HOST as string}/resto/api/`,
		});
	}

	async auth() {
		const { data } = await this.axiosInstance.get('auth', {
			params: {
				login: process.env.IIKKO_API_HOST_LOGIN,
				pass: process.env.IIKKO_API_HOST_PASS
			}
		})
		return data
	}


	async dapartaments() {
		const key = await this.auth()

		const { data } = await this.axiosInstance.get('corporation/groups', {
			params: {
				key: key,
			},
			headers: {
				Accept: 'application/xml',
				"Content-Type": "application/json;odata=verbose",
				credentials: true,

			},


		})

		return data
	}

	async olapsData(body: any) {
		try {
			const key = await this.auth()
			const { data } = await this.axiosInstance.post('v2/reports/olap', body, {
				params: {
					key: key,
				}
			})


			return data && data.data
		} catch (error) {
			console.log(error);
		}
	}

	async sredniychek(from: string, to: string) {
		const body = {
			"reportType": "SALES",
			"buildSummary": "false",
			"groupByRowFields": [
				"OpenDate.Typed",
				"Department.Id",
				"Department"
			],
			"groupByColFields": [],
			"aggregateFields": [
				"UniqOrderId.OrdersCount",
				"fullSum",
				"DishDiscountSumInt",
				"DishDiscountSumInt.average"
			],
			"filters": {
				"OpenDate.Typed": {
					"filterType": "DateRange",
					"periodType": "CUSTOM",
					"from": from,
					"to": to,
					"includeLow": "true",
					"includeHigh": "true"
				},
				"Department.Id": {
					"filterType": "ExcludeValues",
					"values": [
						"1b1bcce0-dac4-49a7-b3b0-27c10975c1f1"
					]
				},
				"OrderDeleted": {
					"filterType": "IncludeValues",
					"values": [
						"NOT_DELETED"
					]
				},
				"DeletedWithWriteoff": {
					"filterType": "IncludeValues",
					"values": [
						"NOT_DELETED"
					]
				},
				"OperationType": {
					"filterType": "ExcludeValues",
					"values": [
						"STORNED",
						"NO_PAYMENT"
					]
				}
			}
		}


		return this.olapsData(body)
	}

	async sredniychekMouth(from: string, to: string) {
		const body = {
			"reportType": "SALES",
			"buildSummary": "false",
			"groupByRowFields": [
				"Department.Id",
				"Department"
			],
			"groupByColFields": [],
			"aggregateFields": [
				"UniqOrderId.OrdersCount"
			],
			"filters": {
				"OpenDate.Typed": {
					"filterType": "DateRange",
					"periodType": "CUSTOM",
					"from": from,
					"to": to,
					"includeLow": "true",
					"includeHigh": "true"
				},
				"OrderDeleted": {
					"filterType": "IncludeValues",
					"values": ["NOT_DELETED"]
				},
				"DeletedWithWriteoff": {
					"filterType": "IncludeValues",
					"values": ["NOT_DELETED"]
				},
				"OperationType": {
					"filterType": "ExcludeValues",
					"values": ["STORNED", "NO_PAYMENT"]
				}
			}
		}

		return this.olapsData(body)

	}

	async vyruchkaMounth(from: string, to: string) {
		const body = {
			"reportType": "SALES",
			"buildSummary": "false",
			"groupByRowFields": [
				"Department.Id",
				"Department"
			],
			"groupByColFields": [],
			"aggregateFields": [
				"fullSum",
				"DishDiscountSumInt"
			],
			"filters": {
				"OpenDate.Typed": {
					"filterType": "DateRange",
					"periodType": "CUSTOM",
					"from": from,
					"to": to,
					"includeLow": "true",
					"includeHigh": "true"
				},
				"OrderDeleted": {
					"filterType": "IncludeValues",
					"values": [
						"NOT_DELETED"
					]
				},
				"DeletedWithWriteoff": {
					"filterType": "IncludeValues",
					"values": [
						"NOT_DELETED"
					]
				},
				"OperationType": {
					"filterType": "ExcludeValues",
					"values": [
						"STORNED",
						"NO_PAYMENT"
					]
				}
			}
		}

		return await this.olapsData(body)
	}

}