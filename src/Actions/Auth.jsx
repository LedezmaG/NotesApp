import Swal from 'sweetalert2'
import { types } from "./../Types/Types"
import { firebase, googleAuthProvider } from './../Firebase/Firebase-config'
import { FinishLoading, StartLoading } from "./Ui"
import { NoteLogout } from './Notes'

export const startLoginEmail = ( email, password ) => {
    return ( dispatch ) => {
        dispatch( StartLoading() )
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( async ({ user }) => {
            dispatch( FinishLoading() )
            dispatch( Login( user.uid, user.displayName ) )
        })
        .catch( e => {
            console.log( e );
            dispatch( FinishLoading() )
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.message,
            })
        })
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
        .then( ({ user:{ uid, displayName } }) => {
            dispatch(
                Login( uid, displayName )
            )
        })
    }
}

export const startRegisterWhitEmail = ( email, name, password ) => {
    return ( dispatch ) => {
        dispatch( StartLoading() )
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async ({ user }) => {
            await user.updateProfile({ displayName: name })
            dispatch( FinishLoading() )
            dispatch( Login( user.uid, user.displayName ) )
        })
        .catch( e => {
            console.log( e );
            dispatch( FinishLoading() )
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.message,
            })
        })
    }
}

export const Login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async ( dispatch ) => {
        await firebase.auth().signOut()
        dispatch( Logout() )
        dispatch( NoteLogout() )
    }
}

export const Logout = () => ({
    type: types.logout
})
