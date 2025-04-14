// import {
//   RouterProvider,
//   createBrowserRouter,
// } from "react-router-dom";
// import { ROUTER_PATHS } from "./routes";
// import Main from "../pages/main";
// import Best from "../pages/Best/Best";
// import Community from "../pages/Community/Community";

// const router = createBrowserRouter([
//   {
//       path: ROUTER_PATHS.HOME,
//       element: null,
//       children: [ 
//           {
//               path: ROUTER_PATHS.HOME,
//               element: <Main isOpen={false} setIsOpen={() => {}}/>,
//           },
//           // {
//           //     path: ROUTER_PATHS.NEWS,
//           //     element: <News />,
//           // },
//           // {
//           //     path: ROUTER_PATHS.NEWS_ITEM,
//           //     element: <SingleNewsPage />,
//           // },
//           {
//               path: ROUTER_PATHS.COMMUNITY,
//               element: <Community />,
//           },
//           // {
//           //     path: ROUTER_PATHS.LIVE,
//           //     element: <Live />,
//           // },
//           // {
//           //     path: ROUTER_PATHS.FAQ,
//           //     element: <FAQ />,
//           // },
//           {
//               path: ROUTER_PATHS.BEST,
//               element: <Best />,
//           },
//           // {
//           //     path: ROUTER_PATHS.REGISTER,
//           //     element: <Register />,
//           // },
//           // {
//           //     path: ROUTER_PATHS.LOGIN,
//           //     element: <Login />,
//           // },
//           // {
//           //     path: ROUTER_PATHS.PAYMENT_SUCCESS,
//           //     element: <PaymentSuccess />,
//           // },
//           // {
//           //     path: ROUTER_PATHS.PAYMENT_FAILED,
//           //     element: <PaymentFailed />,
//           // },
//           // {
//           //     path: ROUTER_PATHS.CONTACTS,
//           //     element: <Contacts />,
//           // },
//           // {
//           //     path: ROUTER_PATHS.RESTORE_PASSWORD,
//           //     element: <RestorePassword />,
//           // },
//           // {
//           //     path: ROUTER_PATHS.CHART,
//           //     element: <Chart />,
//           // },
//       ]
//   }
// ]);

// export function AppRouter() {
//   return <RouterProvider router={router} />;
// }
