import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class IIkkoDeliveryRequest {
	axiosInstance: AxiosInstance

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: `${process.env.IIKKO_API_DELIVERY as string}`,
		});
	}

	async auth() {
		const { data } = await this.axiosInstance.get('auth/access_token', {
			params: {
				user_id: process.env.IIKKO_API_DELIVERY_LOGIN,
				user_secret: process.env.IIKKO_API_DELIVERY_PASS
			}
		})
		return data
	}




}