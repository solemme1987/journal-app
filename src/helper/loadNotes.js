import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async( uid = '') => {
  
  if( !uid ) throw new Error('El UID del usuario no existe')
    //LA ruta que estamos pasando a quei como parametro debe coincidir con la ruta
   // de la coleccion en la base dedatos.

  const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` )
  const docs = await getDocs( collectionRef )

  const notes = []

  docs.forEach(doc => {
     notes.push({id: doc.id, ...doc.data()})
  });

  
  return notes
}