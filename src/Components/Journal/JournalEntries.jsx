import React from 'react'
import { useSelector } from 'react-redux'
import { JorunalEntry } from './JorunalEntry'

export const JournalEntries = () => {

    const { notes } = useSelector(state => state.notes)

    return (
        <div className="journal__entries">
            {
                notes.map( note => (
                    <JorunalEntry 
                        key={ note.id }
                        { ...note } 
                    /> 
                ))
            }
        </div>
    )
}
