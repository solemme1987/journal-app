import { AppBar, Grid, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { Logout, Menu } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth"

export const NavBar = ({ drawerWidth }) => {

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(startLogout())
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge='start'
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <Menu />
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>

          <Typography variant='h6' noWrap component='div'> JournalApp </Typography>
          <Tooltip title="Salir"  arrow >
            <IconButton
              color='error'
              onClick={onLogout}
            >
              <Logout />
            </IconButton>
          </Tooltip>
        </Grid>


      </Toolbar>

    </AppBar>
  )
}
