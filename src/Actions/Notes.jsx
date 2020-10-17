import Swal from "sweetalert2"
import { bd } from "../Firebase/Firebase-config"
import { FileUoload } from "../Helpers/FileUpload"
import { LoadNotes } from "../Helpers/LoadNotes"
import { types } from './../Types/Types'


export const StartNewNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await bd.collection(`${uid}/journal/notes`).add( newNote )

        dispatch( ActiveNote( docRef.id, newNote ) )
        dispatch( AddNewNote( docRef.id, newNote ) )

    }
}

export const ActiveNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const AddNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const StartLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        const notes = await LoadNotes( uid )
        dispatch( SetNotes( notes ) )
    }
}

export const SetNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const StartSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth

        if ( !note.url ) {
            delete note.url
        }

        const noteToDB = { ...note }
        delete noteToDB.id

        await bd.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToDB )
        .then( item => {
            dispatch( RefreshNote( note.id, noteToDB ) )
            Swal.fire(
                'Saved',
                'Note was saved successfully',
                'success'
            )
        })
        .catch( error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            })
        })
        
    }
}

export const RefreshNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload:{
        id,
        note: {
            id,
            ...note
        }
    }
})

export const StartDelete = ( id ) => {
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth

        await bd.doc(`${ uid }/journal/notes/${ id }`).delete()
        .then( note => {
            dispatch( DeleteNote( id ) )

            Swal.fire(
                'Removed',
                'Note was removed successfully',
                'success'
            )
        })
        .catch( err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message
            })
        })
    }
}
export const StartUploading = ( file ) => {
    return async ( dispatch, getState ) => {
        const { active: activeNote } = getState().notes
        
        Swal.fire({
            title: 'Loading...',
            text: 'Please wait',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        const fileURL = await FileUoload( file[0] )
        activeNote.url = fileURL
        dispatch( StartSaveNote( activeNote ))
        
        Swal.close()
    }
}

export const DeleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
})

export const NoteLogout = () => ({
    type: types.notesLogoutCleaning
})