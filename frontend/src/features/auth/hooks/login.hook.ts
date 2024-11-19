import { useState } from "react"
import { AuthApiRequest } from "../api/login.api"

export const useAuthLogin = () => {
	const [error, setError] = useState(false)

	const onSubmitAuth = async (event: any) => {
		event.preventDefault()
		const user = {
			name: event.target[0].value,
			password: event.target[1].value
		}
		try {
			const { data } = await AuthApiRequest.loginDasbord(user)
			console.log(data);


		} catch (error) {
			setError(true)
		}
	}

	return {
		onSubmitAuth,
		error
	}
}


