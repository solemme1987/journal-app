import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    imageURLs: [],
    /* active: {
      id: 'ABC123',
      title: '',
      body: '',
      date: '',
      imageURLs: [] // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    } */

  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },
    setAciveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    updateNote: (state, action) => {//este reducer es para cuando actualizo la nota
      state.isSaving = false
      // recorro el arreglo del estado que tiene las notas y le paso la nueva nota actualizada
      state.notes =state.notes.map(note =>{
         if ( note.id === action.payload.id ){
           return action.payload
         }
         return note
      })

      state.messageSaved = `${ action.payload.title } Aactualizada correctamente`
    },
    // Cargo las nuevas imagenes a la nota que esta activa, pero debems
    // mantener las images que ya estaban anteriormente
    setPhotosToActiveNote:(state, action) => {
      state.active.imageURLs = [...state.active.imageURLs, ...action.payload ]
      state.isSaving = false
    },
        //con esto limpiamos el stado al cerrar sesion.
    clearNotesLogout: ( state ) =>{
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.active = null
    },
    //Eliminamos la nota del estado 
    deleteNoteById: (state, action) => {
     state.active = null
     state.notes = state.notes.filter(note => note.id !== action.payload)
    },
  }
});


// Action creators are generated for each case reducer function
export const {
  savingNewNote,
  addNewEmptyNote,
  setAciveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
  clearNotesLogout,

} = journalSlice.actions;