import { bd } from "../Firebase/Firebase-config"


export const LoadNotes = async( uid ) => {

    const notesSnap = await bd.collection( `${uid}/journal/notes` ).get()
    const notes = []

    notesSnap.forEach( snapChild => {
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        })
    })
    
    return notes

}