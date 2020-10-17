import { types } from "../Types/Types"


const InitiialState = {
    notes: [],
    active: null
} 

export const NotesReducer = ( state = InitiialState, action ) => {
    switch ( action.type ) {
        case types.notesActive:
            return{
                ...state,
                active:{
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return{
                ...state,
                notes:[
                    action.payload,
                    ...state.notes
                ]
            }
        
        case types.notesLoad:
            return{
                ...state,
                notes:[
                    ...action.payload
                ]
            }

        case types.notesUpdate:
            return{
                ...state,
                notes: state.notes.map( note => 
                    note.id === action.payload.id 
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:
            return{
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }
        
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }
    
        default:
            return state
    }
}