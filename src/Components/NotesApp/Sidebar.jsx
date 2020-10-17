import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../Actions/Auth'
import { StartNewNote } from '../../Actions/Notes'
import { JournalEntries } from './NoteEntries'

export const Sidebar = () => {

    const dispatch = useDispatch()
    const { name } = useSelector( state => state.auth )

    const handelLogOut = () => {
        dispatch( startLogout() )
    }

    const handleAddNote = () => {
        dispatch( StartNewNote() );
    }

    return (
        <aside className="app__sidebar" >
            <div className="sidebar__navbar">
                <h3 className="mt-5"> 
                    <i className="fas fa-user" />
                    <span> { name } </span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handelLogOut }
                >
                    Logout
                </button>
            </div>

            <div 
                className="sidebar__new-entry mt-5"
                onClick={ handleAddNote }
            >
                <i className="far fa-calendar-plus fa-5x" />
                <p className="mt-1 mb-1">
                    Add new entry
                </p>
            </div>

            <JournalEntries />

        </aside>
    )
}
