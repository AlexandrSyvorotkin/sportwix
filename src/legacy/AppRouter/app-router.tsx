import {
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import { ROUTER_PATHS } from "../constants/routes";
import Best from "../pages/Best/Best";
import Chart from "../pages/Chart/Chart";
import Community from "../pages/Community/Community";
import Contacts from "../pages/Contacts/Contacts";
import FAQ from "../pages/FAQ/FAQ";
import Live from "../pages/Live/Live";
import Login from "../pages/Login/Login";
import News from "../pages/News/News";
import PaymentFailed from "../pages/PaymentFailed/PaymentFailed";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import Register from "../pages/Register/Register";
import RestorePassword from "../pages/RestorePassword/RestorePassword";
import SingleNewsPage from "../pages/SingleNewsPage/SingleNewsPage";
import Layout from "../layout/MainLayout/Layout";
import StartPage from "../pages/start-page/start-page";

const router = createBrowserRouter([
    {
        path: ROUTER_PATHS.HOME,
        element: <Layout/>,
        children: [ 
            {
                path: ROUTER_PATHS.HOME,
                element: <StartPage />,
            },
            {
                path: ROUTER_PATHS.NEWS,
                element: <News />,
            },
            {
                path: ROUTER_PATHS.NEWS_ITEM,
                element: <SingleNewsPage />,
            },
            {
                path: ROUTER_PATHS.COMMUNITY,
                element: <Community />,
            },
            {
                path: ROUTER_PATHS.LIVE,
                element: <Live />,
            },
            {
                path: ROUTER_PATHS.FAQ,
                element: <FAQ />,
            },
            {
                path: ROUTER_PATHS.BEST,
                element: <Best />,
            },
            {
                path: ROUTER_PATHS.REGISTER,
                element: <Register />,
            },
            {
                path: ROUTER_PATHS.LOGIN,
                element: <Login />,
            },
            {
                path: ROUTER_PATHS.PAYMENT_SUCCESS,
                element: <PaymentSuccess />,
            },
            {
                path: ROUTER_PATHS.PAYMENT_FAILED,
                element: <PaymentFailed />,
            },
            {
                path: ROUTER_PATHS.CONTACTS,
                element: <Contacts />,
            },
            {
                path: ROUTER_PATHS.RESTORE_PASSWORD,
                element: <RestorePassword />,
            },
            {
                path: ROUTER_PATHS.CHART,
                element: <Chart />,
            },
        ]
    }
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}
