import { createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalApp } from "../JournalApp";
import { JournalRoutes } from "../journal/routes/JournalRoutes";


export const getRoutes = () => createBrowserRouter([
  {
    path: '/auth/*',
    children: AuthRoutes,
  },
  {
    path: '/', 
    element: <JournalApp />,
    children: JournalRoutes,
  },
])

