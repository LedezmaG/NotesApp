import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { ActiveNote } from '../../Actions/Notes'

export const JorunalEntry = ({ id, date, title, body, url }) => {

    const dispatch = useDispatch()
    const noteDate = moment( date )

    const noteData = {
        id,
        title,
        body,
        date
    }

    const handleNoteActive = () => {
        dispatch( ActiveNote( id, noteData ) )
    }

    return (
        <div 
            className="jorunal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={ handleNoteActive }
        >
            {
                url &&
                <div 
                    className="jorunal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                > </div>
            }

            <div className="jorunal__entry-body">
                <p className="jorunal__entry-title">
                    { title } 
                </p>
                <p className="jorunal__entry-content">
                    { body }
                </p>
            </div>

            <div className="jorunal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
