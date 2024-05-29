import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setAciveNote } from "../../store/journal"


export const SideBarItem = ({title = '', body, data, imageURLs = [], id}) => {

   // si el titulo es muy largo se deja solo de 17 caracteres
   const newTitle = useMemo(() => {
       return  title.length > 17 
         ? title.substring(0,17) + '...'
         : title
   }, [title])

  const dispatch = useDispatch()

  //Colocando esta nota activa cuando se hace clic sobre ella
  const onActiveNote = () => {

    dispatch( setAciveNote({ id, title, body, data, imageURLs, }) )

  }

  return (
    <ListItem disablePadding>
      <ListItemButton
       onClick={onActiveNote}
      >
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>

        <Grid container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ body} />
        </Grid>

      </ListItemButton>
    </ListItem>
  )
}
