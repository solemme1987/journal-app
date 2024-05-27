/* import { createBrowserRouter } from "react-router-dom";
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
]) */


import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalApp } from "../JournalApp";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks";



export const AppRoutes = () => {

  const  status = useCheckAuth()

  //privatizamos las rutas
  // si esta autenticado se muestra el dashboard y si no, se mantiene 
  // las paginas del login o registro
  const router = (status === "authenticated")
    ?
    createBrowserRouter([

      {
        path: '/',
        element: <JournalApp />,
        children: JournalRoutes,
      },
    ])
    :
    createBrowserRouter([
      {
        path: '/auth/*',
        children: AuthRoutes,
      },
      {
        path: '*',
        element: <Navigate to='/auth/login' />
      },
    ])

    
  if (status === "checking") {
    return <CheckingAuth />
  }

  return (
    <RouterProvider router={router} />
  )

}
