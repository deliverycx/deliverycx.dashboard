import { DeportamentsListsMultiple } from "features/deportamensListChoise"
import { useState } from "react"
import "./ChartsGeneralMultiple.style.scss"
import { Box, Tabs, Tab } from "@mui/material"
import { ChartsModel } from "entities/charts"
import { useChartsDeportamentsRequest } from "widgets/charts/chartsDeportament/hooks/chartsDeportamentsRequest"
import { useChartsMultiDeportametnsRequest } from "../hooks/chartsMultiDeportametnsRequest"
import { IgroopsDep } from "features/deportamensListChoise/types/groopsdeportemets.type"
import dayjs from "dayjs"

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

export const ChartsGeneralMultiple = () => {
	const [multiDeportamets, setMultiDeportaments] = useState<IgroopsDep[]>([])
	const [value, setValue] = useState(0);
	const [selectedYear, setSelectedYear] = useState<any>(dayjs());
	const charsDeportamet = useChartsMultiDeportametnsRequest(multiDeportamets, selectedYear)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<>
			<DeportamentsListsMultiple setter={setMultiDeportaments} setSelectedYear={setSelectedYear} />
			<div className="charts">
				{
					charsDeportamet &&
					<>

						<div className="chart_tabs_menu">
							<Tabs value={value} orientation="vertical" onChange={handleChange} aria-label="basic tabs example">
								<Tab label="Среднедневная выручка" {...a11yProps(1)} />
								<Tab label="Средний чек" {...a11yProps(2)} />
								<Tab label="Количество чеков в день" {...a11yProps(3)} />
								<Tab label="Количество чеков в день" {...a11yProps(4)} />
							</Tabs>
						</div>
						<div className="chart_tabs_item">
							<CustomTabPanel value={value} index={0}>
								<ChartsModel chart={charsDeportamet.averageDailyRevenue} settings={{ color: "", lable: "Среднедневная выручка" }} />
							</CustomTabPanel>
							<CustomTabPanel value={value} index={1}>
								<ChartsModel chart={charsDeportamet.averageCheck} settings={{ color: "", lable: "Средний чек" }} />
							</CustomTabPanel>
							<CustomTabPanel value={value} index={2}>
								<ChartsModel chart={charsDeportamet.dailyCheckCount} settings={{ color: "", lable: "Количество чеков в день" }} />
							</CustomTabPanel>
							<CustomTabPanel value={value} index={3}>
								<ChartsModel chart={charsDeportamet.monthlyCheckCount} settings={{ color: "", lable: "Количество чеков в месяц" }} />
							</CustomTabPanel>
						</div>


					</>
				}
			</div>
		</>
	)
}