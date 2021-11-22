import React from 'react'
import "./style.css"

export default function LoginForm(props) {
    return (
        <form onSubmit={props.submit} className="LoginForm">
            <input onChange={props.change} name="email" value = {props.loginState.email} placeholder="email"/>
            <input onChange={props.change} name="password" value = {props.loginState.password} type = "password"/>
            <button>Submit</button>
        </form>
    )
}
