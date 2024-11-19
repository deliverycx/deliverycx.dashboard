import { FC, ReactNode } from "react"

export const DeportamentInfoParams: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="deportametinfo_param">
			{children}
		</div>
	)
}