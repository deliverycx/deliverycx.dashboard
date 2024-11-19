import styled from "styled-components";
import "./widgets.scss";
import { FC } from "react";

type Iprops = {
	styleSettings?: {
		bgcolor?: string;
		colorNum?: string;
	};
	childernSettings: {
		cloumNumber: number;
		columStatus: "up" | "down";
		columStatusNumber: number;
	};
};

export const WidgetsColum: FC<Iprops> = ({
	styleSettings,
	childernSettings,
}) => {
	return (
		<Widgets_colum
			bgcolor={styleSettings?.bgcolor || "var(--black-to-white-white-100)"}
			colorNum={styleSettings?.colorNum || " #3a1458"}
			className="widgets_colum_color"
		>
			<div className="widgets_colum-number">{childernSettings.cloumNumber}</div>
			<div className="widgets_colum_status">
				{childernSettings.columStatus === "up" && (
					<svg
						width="10"
						height="5"
						viewBox="0 0 10 5"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1.2002 5.00078C1.0502 5.00078 0.929362 4.95078 0.837695 4.85078C0.746029 4.75078 0.700195 4.63411 0.700195 4.50078C0.700195 4.46745 0.750195 4.35078 0.850195 4.15078L4.4752 0.525781C4.55853 0.442448 4.64186 0.384115 4.7252 0.350781C4.80853 0.317448 4.9002 0.300781 5.0002 0.300781C5.1002 0.300781 5.19186 0.317448 5.2752 0.350781C5.35853 0.384115 5.44186 0.442448 5.5252 0.525781L9.1502 4.15078C9.2002 4.20078 9.2377 4.25495 9.2627 4.31328C9.2877 4.37161 9.3002 4.43411 9.3002 4.50078C9.3002 4.63411 9.25436 4.75078 9.1627 4.85078C9.07103 4.95078 8.9502 5.00078 8.8002 5.00078H1.2002Z"
							fill="#558950"
						/>
					</svg>
				)}
				{childernSettings.columStatus === "down" && (
					<svg
						width="9"
						height="5"
						viewBox="0 0 9 5"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3.9752 4.475L0.350195 0.85C0.300195 0.8 0.262695 0.745833 0.237695 0.6875C0.212695 0.629167 0.200195 0.566667 0.200195 0.5C0.200195 0.366667 0.246029 0.25 0.337695 0.15C0.429362 0.05 0.550195 0 0.700195 0H8.3002C8.4502 0 8.57103 0.05 8.6627 0.15C8.75436 0.25 8.8002 0.366667 8.8002 0.5C8.8002 0.533333 8.7502 0.65 8.6502 0.85L5.0252 4.475C4.94186 4.55833 4.85853 4.61667 4.7752 4.65C4.69186 4.68333 4.6002 4.7 4.5002 4.7C4.4002 4.7 4.30853 4.68333 4.2252 4.65C4.14186 4.61667 4.05853 4.55833 3.9752 4.475Z"
							fill="#8D191D"
						/>
					</svg>
				)}

				<span className="status--number">
					{childernSettings.columStatusNumber}
				</span>
			</div>
		</Widgets_colum>
	);
};

const Widgets_colum = styled.div<{ bgcolor: string; colorNum: string }>`
  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ colorNum }) => colorNum};
`;
