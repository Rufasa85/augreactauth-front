import React from 'react'
import "./style.css"

export default function PetCard(props) {
    return (
        <div className={`PetCard ${props.species}`}>
            <h3>{props.name} is {props.age} years old!</h3>
            <p>{props.description}</p>
        </div>
    )
}
