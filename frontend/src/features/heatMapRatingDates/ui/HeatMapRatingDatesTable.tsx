import { Box, Tab, Tabs } from "@mui/material";
import { SettingDatePicker } from "features/dateFinModel/ui/SettingDatePicker";
import { FC, useState } from "react";

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
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export const HeatMapRatingDatesTable: FC<{ set: any }> = ({ set }) => {
	const [value, setValue] = useState(0);
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className="heatMapRatingDatesTable">
			<div className="dates_table-menu">
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="За месяц" {...a11yProps(1)} />
					<Tab label="За квартал" {...a11yProps(2)} />
					<Tab label="За год" {...a11yProps(3)} />
				</Tabs>
			</div>
			<div className="dates_table-items">
				<CustomTabPanel value={value} index={0}>
					<SettingDatePicker setDate={set} />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}></CustomTabPanel>
			</div>
		</div>
	)
}