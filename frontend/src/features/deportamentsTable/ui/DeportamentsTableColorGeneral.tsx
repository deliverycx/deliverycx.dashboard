import { FC } from "react"
import { useCaseDeportamentsTable } from "../hooks/useCaseDeportamentsTable"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableSortLabel } from "@mui/material";
import { colorName, keyDifferenceRatingParams } from "entities/generalMapRating/types/colorRating.type";
import { useCaseDeportamentsTableGeneral } from "../hooks/useCaseDeportamentsTableGeneral";
import "./style.scss"
import { DeportamentModalChartGeneral } from "./DeportamentModalChartGeneral";

export const DeportamentsTableColorGeneral: FC<{ handlerColorList: any, deportametColorList: any }> = ({ deportametColorList, handlerColorList }) => {
	const { sortedDeportametColorList, orderBy, handlerSorted } = useCaseDeportamentsTableGeneral(deportametColorList, handlerColorList)

	const colorRow = (color: colorName) => {
		switch (color) {
			case colorName.green: return "#9bcfb5"
			case colorName.witegreen: return "#cee1af"
			case colorName.yelow: return "#fff7b2"
			case colorName.red: return "#f3a79f"
		}
	}


	return (
		<Table sx={{ minWidth: 500 }} aria-label="simple table">
			<TableHead>
				<TableRow>
					<TableCell>Название</TableCell>
					<TableCell align="right">
						<TableSortLabel
							active={orderBy.sortid === keyDifferenceRatingParams.profitDifferenceOpening}
							direction={orderBy.sorted}
							onClick={
								(event) => orderBy.sorted === "desc"
									? handlerSorted("asc", keyDifferenceRatingParams.profitDifferenceOpening)
									: handlerSorted("desc", keyDifferenceRatingParams.profitDifferenceOpening)}
						>
							По сумме
						</TableSortLabel>
					</TableCell>
					<TableCell align="right">
						<TableSortLabel
							active={orderBy.sortid === keyDifferenceRatingParams.profitDifferencePlan}
							direction={orderBy.sorted}
							onClick={
								(event) => orderBy.sorted === "desc"
									? handlerSorted("asc", keyDifferenceRatingParams.profitDifferencePlan)
									: handlerSorted("desc", keyDifferenceRatingParams.profitDifferencePlan)}
						>
							По %
						</TableSortLabel>
					</TableCell>


				</TableRow>
			</TableHead>
			<TableBody>
				{sortedDeportametColorList && sortedDeportametColorList.map((row: any) => (
					<TableRow
						key={row.deportamentName}
						sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: colorRow(row.color) }}
					>
						<TableCell component="th" scope="row">
							<a className="deportament_link" target="_blank" href={`/deportament/${row.deportamentIds}`}>{row.deportamentName}</a>
						</TableCell>
						<TableCell align="right">
							<DeportamentModalChartGeneral deportament={row.deportamentIds} typemodel="profitDifferenceOpening">
								{row.profitDifferenceOpening}
							</DeportamentModalChartGeneral>

						</TableCell>
						<TableCell align="right">
							<DeportamentModalChartGeneral deportament={row.deportamentIds} typemodel="profitDifferencePlan">
								{(Math.floor(row.profitDifferencePlan * 100) / 100)}
							</DeportamentModalChartGeneral>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}