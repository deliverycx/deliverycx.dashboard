import {
	createBrowserRouter,
} from "react-router-dom";
import { MainPage } from "../../pages/main";
import { ROUTE_APP } from "./router.const";
import { LoginPage } from "pages/auth";
import { SettingsPage } from "pages/settings";
import { MainPageLayout } from "application/layout/MainPageLayout.ui";
import { PointsPage } from "pages/points";
import { DeportamentPage } from "pages/deportamen";

export const appRouter = createBrowserRouter([
	{
		path: ROUTE_APP.MAIN,
		element: <MainPageLayout><MainPage /></MainPageLayout>,
	},
	{
		path: ROUTE_APP.POINTS,
		element: <MainPageLayout><PointsPage /></MainPageLayout>,
	},
	{
		path: `${ROUTE_APP.DEPORTAMENT}:id`,
		element: <MainPageLayout><DeportamentPage /></MainPageLayout>,
	},
	{
		path: ROUTE_APP.AUTH,
		element: <LoginPage />,
	},
	{
		path: ROUTE_APP.SETTINGS,
		element: <MainPageLayout><SettingsPage /></MainPageLayout>,
	}
])
