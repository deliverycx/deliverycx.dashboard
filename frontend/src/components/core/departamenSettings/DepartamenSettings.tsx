import { Box, Tabs, Tab } from "@mui/material"
import { FinModelFormMouthTable } from "entities/deportamentsFinModel/ui/FinModelFormMouthTable"
import { SettingDatePicker } from "features/dateFinModel/ui/SettingDatePicker"
import { DeportamentsLists } from "features/deportamensListChoise"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import React from "react"
import { useState } from "react"
import { DeportamentSettingTabs } from "widgets/deportamentSettingTabs"
import { HOCDetailedfinModel } from "widgets/finModel/ui/HOC.DetailedfinModel.ui"
import "./DepartamenSettings.style.scss"
import { DeportamentInfoForm } from "entities/deportamentInfo"
import { DeportamentInfoSettingForm } from "entities/deportamentInfo/ui/DeportamentInfoSettingForm"

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

const DepartamenSettings = () => {
	const [choiseDeportament, setChoiseDeportament] = useState<IgroopsDep | null>(null)

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};


	return (
		<>
			<DeportamentsLists setter={setChoiseDeportament} />
			{
				choiseDeportament &&
				<>
					<h2 className="deportamet_title">{choiseDeportament.firstLetter}, {choiseDeportament.title}</h2>
					<Box sx={{ width: '100%' }}>
						<div className="setting_tabs">

							<div className="setting_tabs_item">

								<CustomTabPanel value={value} index={0}>
									<DeportamentInfoForm deportament={choiseDeportament} />
									<DeportamentInfoSettingForm deportament={choiseDeportament} />
								</CustomTabPanel>
								<CustomTabPanel value={value} index={1}>
									<DeportamentSettingTabs deportament={choiseDeportament} />
								</CustomTabPanel>
								<CustomTabPanel value={value} index={2}>
									<HOCDetailedfinModel deportament={choiseDeportament} widgetMouth={true} />
								</CustomTabPanel>
							</div>
							<div className="setting_tabs_menu">
								<Tabs value={value} orientation="vertical" onChange={handleChange} aria-label="basic tabs example">
									<Tab label="настройки заведения" {...a11yProps(0)} />
									<Tab label="Финансовая модель" {...a11yProps(1)} />
									<Tab label="Показатели" {...a11yProps(2)} />
								</Tabs>
							</div>
							<div className="setting_tabs-clf"></div>
						</div>



					</Box>
				</>
			}

		</>
	)
}
export default DepartamenSettings