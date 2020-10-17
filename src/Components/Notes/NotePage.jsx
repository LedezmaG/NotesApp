import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActiveNote, StartDelete } from '../../Actions/Notes'
import { useForm } from '../../Hooks/useForm'
import { NotesAppbar } from './NotesAppbar'

export const NotePage = () => {

    const dispatch = useDispatch()

    const { active: note } = useSelector(state => state.notes)
    const [ formValues, handelImputChange, reset ] = useForm( note )
    const { title, body, id, url } = formValues
    const activeId = useRef( note.id )
    
    useEffect(() => {
        if ( note.id !== activeId.current ) {
            reset( note )
            activeId.current = note.id
        }
    }, [ reset, note ])

    useEffect(() => {
        dispatch( ActiveNote( formValues.id, {...formValues} ) )
    }, [ formValues, dispatch ])

    const handelDelete = () => {
        dispatch( StartDelete( id ) )
    }

    console.log( note );
    
    return (
        <div className="notes__main-content">
            <NotesAppbar />
            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Lorem Ipsum"
                    name="title"
                    className="notes__title-imput"
                    autoComplete="off"
                    value={ title }
                    onChange={ handelImputChange }
                />
                <textarea
                    name="body"
                    placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel fugiat porro dolores aut quia quod et pariatur dolorum unde aliquid, ratione ducimus nisi veniam magni, iure consectetur sint, ipsa nam?"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handelImputChange }
                />
                {
                    note.url &&
                        <div className="notes__image">
                            <img 
                                src={ note.url } 
                                alt="note"
                            />
                        </div>
                }
            </div>
            <button 
                className="btn btn-outline-primary"
                onClick={ handelDelete }
            >
                Delete
            </button>
        </div>
    )
}
