import { FC, ReactNode, useContext } from "react"
import { FinModelContext } from "widgets/finModel/ui/HOC.DetailedfinModel.ui"
import "./style.scss"
import styled from "styled-components"

type IProps = {
	finkey: string
	children: ReactNode
}
export const FinModelIndicatorPerfomans: FC<IProps> = ({ finkey, children }) => {
	const useCase = useContext(FinModelContext)
	const { finModelIndicatorFormatter } = useCase

	const perfomans = finModelIndicatorFormatter.performanceIndicator(finkey)
	return (
		<Perfomans_Item className="perfomans_model" isActive={perfomans}>
			{
				children
			}
		</Perfomans_Item>
	)
}


const Perfomans_Item = styled.a<{ isActive: "red" | "green" }>`
  background-color: ${({ isActive }) =>
		isActive === "red" ? "#8d191d" : isActive === "green" ? "#558950" : ""};

`;