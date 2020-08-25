import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import logo from '../assets/ChatLogo.svg'
import { auth, provider } from '../firebase'
import { actionTypes } from '../Reducer'
import { useStateValue } from "../StateProvider.js"

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn =  () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        }).catch(error=> alert(error.message));
    }

    return (
        <div className="Login">
            <div className="LoginContainer">
                <img src={logo}></img>
                <div className="LoginText">
                    <h1>Sign in to MeetNewFriends</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
