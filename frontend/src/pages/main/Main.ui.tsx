import { ChartsGeneralMultiple } from 'widgets/charts'
import './Main.scss'
import { HeatmapRating } from 'widgets/heatmapRating/ui/HeatmapRating'

export const MainPage = () => {
	return (
		<>
			<HeatmapRating />
			<ChartsGeneralMultiple />
		</>
	)
}
