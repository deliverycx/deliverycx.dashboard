import { FC, ReactNode } from "react"
import { Menu } from "widgets/menu/ui/Menu.ui"

export const MainPageLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="container">
			<div className="container_box">
				<Menu />
				<div className="right_container">
					{children}
				</div>
			</div>

		</div>
	)
}