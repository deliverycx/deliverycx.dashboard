import { FC } from "react";
import "./DeportamentDetailed.style.scss"
import { useDeportamentDetaildedHooks } from "../hook/deportamentDetailedRequest.hook";
import { DeportamentInfoTable } from "entities/deportamentInfo";
import { DeportamentInfoParams } from "entities/deportamentInfo/ui/DeportamentInfoParams";
import { FinModelMetrics } from "widgets/finModel/ui/FinModelMetrics.ui";
import { HOCDetailedfinModel } from "widgets/finModel/ui/HOC.DetailedfinModel.ui";

export const DeportamentDetailed: FC<{ deportamentid: string }> = ({ deportamentid }) => {
	const deportametnDetailed = useDeportamentDetaildedHooks(deportamentid)

	return (
		<>
			{
				deportametnDetailed &&
				<>
					<div className="detailed">
						<h2 className="detailed_box_title">{deportametnDetailed.departament}</h2>
						<div className="detailed_box">
							<div className="detailed_box_left">
								<DeportamentInfoTable deportament={deportametnDetailed} />
							</div>
							{
								deportametnDetailed.setting &&
								<div className="detailed_box_right">
									{
										deportametnDetailed.setting.quality &&
										<DeportamentInfoParams>
											<div className="deportametinfo_param-numb">{deportametnDetailed.setting.quality}</div>
											<div className="deportametinfo_param-title">Оценка качества</div>
										</DeportamentInfoParams>
									}
									{
										deportametnDetailed.setting.yandex &&
										<DeportamentInfoParams>
											<div className="deportametinfo_param-numb">{deportametnDetailed.setting.yandex}</div>
											<div className="deportametinfo_param-title">Оценка на яндекс</div>
										</DeportamentInfoParams>
									}
									{
										deportametnDetailed.setting.okupation &&
										<DeportamentInfoParams>
											<div className="deportametinfo_param-numb">
												<svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M11 20.3999L3.99999 13.3999C3.21999 12.6199 1.97999 12.6199 1.19999 13.3999C0.41999 14.1799 0.41999 15.4199 1.19999 16.1999L9.57999 24.5799C10.36 25.3599 11.62 25.3599 12.4 24.5799L33.6 3.39989C34.38 2.61989 34.38 1.37989 33.6 0.599893C32.82 -0.180107 31.58 -0.180107 30.8 0.599893L11 20.3999Z" fill="#006232" />
												</svg></div>
											<div className="deportametinfo_param-title">Точка окупилась</div>
										</DeportamentInfoParams>
									}



								</div>
							}

						</div>


					</div>
					<HOCDetailedfinModel deportament={deportametnDetailed} widgetMouth={false} />
				</>
			}
		</>

	)
}