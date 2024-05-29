import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { useEffect, useMemo, useRef } from "react"
import { setAciveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"


export const NoteView = () => {

  //formato para la hora
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };


  const dispatch = useDispatch()
  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
  const { body, title, data, onInputChange, formState } = useForm(note)

  const fileInputRef = useRef()

  // cada que algun dato del formulario cambie, de una actualizo el estado con el nuevo valor
  // cabe aclarar que se esta actualziando el estado no la base de datos, por lo tanto si se recarga la pagina 
  // se pierden los datos si no se actualiza tambien la base de datos
  useEffect(() => {
    dispatch(setAciveNote(formState))
  }, [formState])

  //activando el alert
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  // subiendo archivos
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return
    dispatch(startUploadingFiles(target.files))
  }

  // formateando la fecha de creacion de la nota
  const dateString = useMemo(() => {
    const newDate = new Intl.DateTimeFormat('es-ES', options).format(data);
    return newDate
  }, [data])


  const onDelete = () => {

    dispatch(startDeletingNote())
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      derection='row'
      justifyContent={"space-between"}
      alignItems='center'
      sx={{ mb: 1 }}>

      <Grid item>
        <Typography
          fontSize={39}
          fontWeight='light'
          textTransform='capitalize'> {dateString}
        </Typography>
      </Grid>

      <Grid item>

        {/*   <input
          type="file"
          multiple
          ref={ fileInputRef }
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
        
        <Tooltip title="Subir imagenes" placement="left" arrow>
          <IconButton 
            color="primary" 
            disabled={isSaving} 
            sx={{ mr: 2 }} 
            //Gracis al useRef podemos simular un clic en el input de arriba 
            // que tiene display none
            onClick={() => fileInputRef.current.click()}
          >
            <UploadOutlined />
          </IconButton>
        </Tooltip> */}

        {/* GUARDAR */}
        <Button
          disabled={isSaving}
          color='primary'
          sx={{ padding: 1 }}
          variant="outlined"
          onClick={onSaveNote}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          fullWidth
          placeholder="Ingrese un título"
          label="Titulo"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: 'none', mb: 3, mt: 2 }}
        />

        <TextField
          type="text"
          fullWidth
          multiline
          placeholder="¿Que sucedió el dìa de hoy?"
          minRows={5}
          label="Descripcion"
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='space-between' alignItems='center' >
        {/* Input para subir archivos oculto y boton para simular clic y abrirlo */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />

        <Tooltip title="Subir imagenes" placement="right" arrow>
          <IconButton
            color="primary"
            disabled={isSaving}
            sx={{ mr: 2 }}
            //Gracis al useRef podemos simular un clic en el input de arriba 
            // que tiene display none
            onClick={() => fileInputRef.current.click()}
          >
            <UploadOutlined />
            
          </IconButton>
        </Tooltip>
        {/* END  */}

        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Borrar nota
        </Button>

      </Grid>

      {/* Image Gallery */}
      <ImageGallery images={note.imageURLs} />

    </Grid>
  )
}
