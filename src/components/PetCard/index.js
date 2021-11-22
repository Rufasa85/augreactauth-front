import React from 'react'
import {Link,useHistory} from "react-router-dom"
import "./style.css"
import API from "../../utils/API"

export default function PetCard(props) {
    const history = useHistory();
    const deletePet= ()=>{
        API.deletePet(props.id,props.token).then(res=>{
            console.log("deleted!")
            props.reload();
        })
    }
    return (
        <div className={`PetCard ${props.species}`}>
            <h3>{props.name} is {props.age} years old!</h3>
            <p>{props.description}</p>
           {props.userId&&<Link to={`/profile/${props.userId}`}>See Owner</Link>}
           {props.canEdit&&<button>Edit</button>}
           {props.canDelete&&<button onClick={deletePet}>Delete</button>}
        </div>
    )
}
