import { axiosInstance } from "@shared/api/AxiosCreate"

export const DeportamentApiRequest = {
	getDeportametData(id: string) {
		return axiosInstance.get(`/deportaments/deportamentData?deportament=${id}`)
	},

	unloadDeportamets() {
		return axiosInstance.get(`/unload/departaments_unload`)
	},

	deportamentInfoData(tabs: string, id: string, body: any) {
		return axiosInstance.post(`/deportaments/deportamenDataInfo?deportamentid=${id}&tabs=${tabs}`, body)
	},
}