import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../../Hooks/useForm'
import validator from 'validator'
import { RemoveError, SetError } from '../../Actions/Ui'
import { startRegisterWhitEmail } from '../../Actions/Auth'

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui )

    const [ formValues, handleImputChange ] = useForm({
        fullname: 'David Ledezma',
        email: 'david@gmail.com',
        password: 'abc123',
        password2: 'abc123'
    })
    const { fullname, email, password, password2 } = formValues;

    const handelRegister = ( e ) => {
        e.preventDefault()
        if ( isFormValid() ) {
            dispatch( startRegisterWhitEmail( email, fullname, password  ))
        }

    }

    const isFormValid = () => {

        if ( fullname.length <= 0  ) {
            dispatch( SetError( 'Error: @fullname is required'  ) )
            return false    
        }
        else if ( !validator.isEmail( email ) ) {
            dispatch( SetError( 'Error: @Email is required and need email format'  ) )
            return false    
        }
        else if ( password !== password2 || password < 5 ) {
            dispatch( SetError( 'Error: @Password have to be equeal an min leng 6'  ) )
            return false    
        }

        dispatch( RemoveError() )
        return true
    }

    return (
        <div>
            <h2 className="auth__title aling-center">Register</h2>

            {
                msgError &&
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
            }

            <form 
                onSubmit={ handelRegister } 
                className="animate__animated animate__fadeIn animate__faster"
            >
                <input 
                    type="text" 
                    placeholder="Full Name"
                    name="fullname"
                    className="auth__input"
                    autoComplete="off"
                    value={ fullname }
                    onChange={ handleImputChange }
                />
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
                    placeholder="Pasword"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleImputChange }
                />
                <input 
                    type="password" 
                    placeholder="Cormfirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleImputChange }
                />
                <button 
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Register
                </button>
                <Link to="/auth/login" className="link" >
                    Already register?
                </Link>
            </form>
        </div>
    )
}
