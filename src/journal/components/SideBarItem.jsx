import { Assignment, TurnedInNot, Work } from "@mui/icons-material"
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setAciveNote } from "../../store/journal"


export const SideBarItem = ({title = '', body, data, imageURLs = [], id}) => {

  const dispatch = useDispatch()

  //formateando la fecha
  const formatDate = (date) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  
   // si el titulo es muy largo se deja solo de 17 caracteres
   const newTitle = useMemo(() => {
       return  title.length > 20 
         ? title.substring(0,20) + '...'
         : title
   }, [title])


  //Colocando esta nota activa cuando se hace clic sobre ella
  const onActiveNote = () => {

    dispatch( setAciveNote({ id, title, body, data, imageURLs, }) )

  }

  return (
    <ListItem disablePadding>
      <ListItemButton
       onClick={onActiveNote}
      >
   
        <ListItemAvatar>
          <Avatar>
            <Assignment/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ newTitle } secondary={formatDate(data)} />
     

      </ListItemButton>
    </ListItem>
  )
}
