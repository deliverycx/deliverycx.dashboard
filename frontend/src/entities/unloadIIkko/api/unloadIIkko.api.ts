import { axiosInstance } from "@shared/api/AxiosCreate"

export const unloadIIKKOApiRequest = {
	setdataUnload(params: any) {
		return axiosInstance.post(`/unload/unloadParams`, params)
	},

	getUnloadParams(deportament: string) {
		return axiosInstance.get(`/unload/params?deportament=${deportament}`)
	}
}