import { axiosInstance } from "@shared/api/AxiosCreate"

export const PointsApiRequest = {
	getDeportamets() {
		return axiosInstance.get('/deportaments/deportamentsList')
	}
}