import React from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { NoteLogout, StartSaveNote, StartUploading } from '../../Actions/Notes'

export const NotesAppbar = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.notes)

    const handleSaveNote = () => {
        dispatch( StartSaveNote( active ) )
    }

    const handleUpadteImage = () => {
        document.querySelector('#FileSeleted').click();
    }
    
    const handleFileChange = ( e ) => {
        const file =  e.target.files ;
        if ( file ) {
            dispatch( StartUploading( file ) )
        }
    }

    return (
        <div className="note__appbar">
            <span> { moment().format('MMMM Do YYYY') } </span>

            <input 
                type="file" 
                style={{ display: "none" }}
                id="FileSeleted"
                onChange={ handleFileChange }
            />
            <div className="">
                <button 
                    className="btn btn-outline-primary"
                    onClick={ handleUpadteImage }
                >
                    Picture
                </button>
                <button 
                    className="btn btn-primary"
                    onClick={ handleSaveNote }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
