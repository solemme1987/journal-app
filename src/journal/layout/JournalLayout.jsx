import { Box, Grid, Toolbar, Typography } from "@mui/material"
import { NavBar, SideBar } from "../components"


const drawerWidth = 260

export const JournalLayout = ({ children }) => {

  
  return (
    <Box sx={{ display: 'flex' }} className="animate__animated animate__fadeIn animate__faster">

      <NavBar drawerWidth={ drawerWidth }/>

      <SideBar drawerWidth={ drawerWidth }/>

      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        {/* Si quito este toolbar  el contenido de los children  quedara por debajo  de el navbar  
          la funcion de este toolbar es solucionar eso
        */}
        <Toolbar/>

        { children }

      </Box>

    </Box>
  )
}
