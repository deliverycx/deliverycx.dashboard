
export class DeportamentsDto {
	departament: string
	departamentid: string
}

export class SredniychekDto {
	departamentid: string
	sredinychekdate?: {
		date: string,
		average: number
	}
	monthlyCheckCount?: {
		date: string,
		average: number
	}
	dailyCheckCount?: {
		date: string,
		average: number
	}
	averageRevenue?: {
		date: string,
		average: number
	}
	averageDailyRevenue?: {
		date: string,
		average: number
	}
}

export class RequestDTOUnloadParams {
	deportamentid: string
	paramKeys: "averageCheck" | "monthlyCheckCount" | "averageDailyRevenue" | "averageRevenue"
	mounth: string
}