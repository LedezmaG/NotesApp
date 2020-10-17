import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { JournalPage } from '../Components/Journal/JournalPage';
import { AuthRouter } from './AuthRouter';
import { firebase } from './../Firebase/Firebase-config'
import { useDispatch } from 'react-redux';
import { Login } from '../Actions/Auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { StartLoadingNotes } from '../Actions/Notes';

export const AppRouter = () => {

    const dispatch = useDispatch(); 
    const [cheking, setCheking] = useState( true )
    const [isLogged, setisLogged] = useState( false )

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user) => {
            if ( user?.uid ) {
                dispatch( Login( user.uid, user.displayName) )
                setisLogged( true )
                dispatch( StartLoadingNotes( user.uid ) )
            }
            else{
                setisLogged( false )
            }
            setCheking( false )

        })

    }, [dispatch, setCheking, setisLogged])

    if ( cheking ) {
        return(
            <h1>Loading... </h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter }
                        isAuth={ isLogged } 
                    />
                    
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ JournalPage } 
                        isAuth={ isLogged } 
                    />
                    
                    <Redirect to="/auth/login" />
                
                </Switch>
            </div>
    </Router>
    )
}
