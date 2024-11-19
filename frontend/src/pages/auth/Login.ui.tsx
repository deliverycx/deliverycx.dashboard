
import { useAuthLogin } from "features/auth"

export const LoginPage = () => {
	const { onSubmitAuth, error } = useAuthLogin()

	return (
		<>
			<form method="post" onSubmit={onSubmitAuth}>
				<div className="input-group mb-3">
					<input type="text" name="login" className="form-control" placeholder="Логин" />
					<div className="input-group-append">
						<div className="input-group-text">
							<span className="fas fa-envelope"></span>
						</div>
					</div>
				</div>
				<div className="input-group mb-3">
					<input type="password" className="form-control" placeholder="Пароль" />
					<div className="input-group-append">
						<div className="input-group-text">
							<span className="fas fa-lock"></span>
						</div>
					</div>
				</div>
				<div className="row">


					<div className="col-4">
						<button type="submit" className="btn btn-primary btn-block">Войти</button>
					</div>

				</div>
			</form>
		</>
	)
}