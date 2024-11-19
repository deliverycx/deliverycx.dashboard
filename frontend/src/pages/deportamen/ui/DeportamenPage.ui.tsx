import { useParams } from "react-router-dom";
import { ChartsDeportamentDefault } from "widgets/charts";
import { DeportamentDetailed } from "widgets/deportamentDetailed/ui/DeportamentDetailed"

export const DeportamentPage = () => {
	const params = useParams();
	const deportamentid = params.id

	return (
		<>
			{
				deportamentid &&
				<>
					<DeportamentDetailed deportamentid={deportamentid} />
					<ChartsDeportamentDefault deportamentid={deportamentid} />
				</>
			}

		</>
	)
}