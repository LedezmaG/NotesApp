import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmail } from '../../Actions/Auth'
import { RemoveError, SetError } from '../../Actions/Ui'
import { useForm } from './../../Hooks/useForm'
import validator from 'validator'

export const LoginPage = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui )

    const [ formValues, handleImputChange ] = useForm({
        email: 'david@gmail.com',
        password: 'abc123'
    })
    const { email, password } = formValues;

    const isFormValid = () => {

        if ( password.length <= 0  ) {
            dispatch( SetError( 'Error: @Password is required'  ) )
            return false    
        }
        else if ( !validator.isEmail( email )  ) {
            dispatch( SetError( 'Error: @Email is required and need email format'  ) )
            return false    
        }

        dispatch( RemoveError() )
        return true
    }

    const handleLogin = ( e ) => {
        e.preventDefault()
        if ( isFormValid() ) {
            dispatch( startLoginEmail( email, password ) )
        }
    }

    const handleGoogleLogin = ( e ) => {
        e.preventDefault()
        dispatch( startGoogleLogin() )
    }

    return (
        <div>
            <h2 className="auth__title aling-center">Login</h2>
            {
                msgError &&
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
            }
            <form 
                onSubmit={ handleLogin } 
                className="animate__animated animate__fadeIn animate__faster"
            >
                <input 
                    type="email" 
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleImputChange }
                />
                <input 
                    type="password" 
                    placeholder="*******"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleImputChange }
                    disabled={ loading }
                />
                <button 
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Login
                </button>
                <div className="auth__social-network" >
                    <p>Log with social networks</p>
                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link to="/auth/register" className="link" >
                    Create new Account
                </Link>
            </form>
        </div>
    )
}
