import { axiosInstance } from "@shared/api/AxiosCreate"

export const AuthApiRequest = {
	loginDasbord(body: { name: string, password: string }) {
		return axiosInstance.post('/authorization/login', body)
	}
}