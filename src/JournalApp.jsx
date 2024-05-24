import { Outlet } from "react-router-dom"
import { AppTheme } from "./theme"
import { Typography } from "@mui/material"


export const JournalApp = () => {
  return (
    <>
     {/* <Typography variant="h1">Journal App</Typography> */}
     <Outlet />
    </>
  )
}
