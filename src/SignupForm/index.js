import React from 'react'
import "./style.css"

export default function SignupForm(props) {
    return (
        <form onSubmit={props.submit} className="SignupForm">
            <input onChange={props.change} name="email" value = {props.signupState.email} placeholder="email"/>
            <input onChange={props.change} name="password" value = {props.signupState.password} type = "password"/>
            <button>Signup</button>
        </form>
    )
}
