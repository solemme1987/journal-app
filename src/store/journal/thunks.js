import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setAciveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} from "./"
import { loadNotes, fileUpload } from "../../helper"


//   Diferencia entre getState y useSelector
/* 
  useSelector() es un custom hook que te brinda la librería react-redux para poder obtener data del store de forma más práctica.

  En cambio getState() es una función que viene de manera implícita cuando realizas llamados al middleware Thunk, es decir cuando despachas funciones en lugar de despachar un objeto de acción.

  Por consiguiente, cada vez que quieras obtener el state más actual al momento de despachar funciones, Thunk ya te da la función getState() para obtener dicha data.

  Entonces al momento de querer obtener el state más actual en componentes utilizarás el custom hook useSelector() ya que la función getState() solo se encuentra disponible al despachar acciones mediante el Thunk.

  NOTE:
  getState es un nombre cualquiera ,puedes llamar como quieras a la callback,como getUid. El nombre no es importante.

*/

export const startNewNote = () => {


  return async (dispatch, getState) => {

    dispatch(savingNewNote())

    const { uid } = getState().auth

    // objeto base de la nota a crear
    const newNote = {
      title: '',
      body: '',
      data: new Date().getTime(),
    }

    /* creamos la nota en Firestore Database */
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)

    // ASIGNAMOS el id de la nueva nota creada a nuestro objeto newNote
    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setAciveNote(newNote))

  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes))
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {

    dispatch(setSaving())

    const { uid } = getState().auth
    const { active: note } = getState().journal

    const noteToFireStore = { ...note }
    delete noteToFireStore.id //borramos el id por que no necesitamos volverlo agregar por que note ya viene con el id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

    //esta ultima linea es para ya decier le que nos guardo los cambios 
    // en la base de datos, el merge: true, quiere decir que si hay campos diferentes que estoy
    // enviando en esta actualizacion, que me mantenga los campos anteriores y me agregue los nuevos
    await setDoc(docRef, noteToFireStore, { merge: true })

    dispatch(updateNote(note))

  }
}

/*  Subimos los archivos  cloudinary y 
    pasamos la url a firestore para consumirla desde alla */
export const startUploadingFiles = ( files = []) =>{
   return async( dispatch ) =>{

     dispatch( setSaving() )
      
      // me creo un array de promesas para poder enviar muchas peticiones POST
      // Y subir las  fotos simultaneamente y no de una en una. 
      const fileUploadPromises = []

      // recorro los archivos subio el usuario y los agrego al 
      // array de promesas que cree anteriormente. y tambien hago la subida
      // directamente a cloudinary con el helper fileUpload()
      for (const file of files) {
        fileUploadPromises.push( fileUpload(file) )
      }  

      // llenamos las fotos con el array  de promesas que creamos
      // utilizando await Promise.all  como es una gestion asincrona 
      // utilizamos await y las promesas son que van a ingresar todo a cloudinaryh
      const photosUrls = await Promise.all( fileUploadPromises)


       //pasamos el array de fotos con las url a la nota activa
       // para cuando guardemos podamos mandarlas a firestore
      dispatch( setPhotosToActiveNote( photosUrls ) )
   }

}

export const startDeletingNote = () =>{
   
  return async( dispatch, getState ) =>{
    

    const { uid } = getState().auth
    const { active:note } = getState().journal
    
    const docRef = doc (FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
    const resp = await deleteDoc(docRef)
    
    dispatch( deleteNoteById( note.id ))
  }
}
