import { axiosInstance } from "@shared/api/AxiosCreate"

export const finModelApiRequest = {
	setfinmodel(params: any, deportament: string, mounhDate: string) {
		return axiosInstance.post(`/finmodel/paramsFinModel?deportament=${deportament}&mouth=${mounhDate}`, params)
	},
	getFinModel(deportament: string) {
		return axiosInstance.get(`/finmodel/getParamsFinModel?deportament=${deportament}`)
	}
}