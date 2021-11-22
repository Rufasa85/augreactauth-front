import React, {useState} from 'react'
import {Link,useHistory} from "react-router-dom"
import "./style.css"
import API from "../../utils/API"
import EditPetForm from "../EditPetForm"

export default function PetCard(props) {
    const [showEditForm,setShowEditForm]= useState(false);
    const history = useHistory();
    
    const deletePet= ()=>{
        API.deletePet(props.id,props.token).then(res=>{
            console.log("deleted!")
            props.reload();
        })
    }
    const editReload = ()=>{
        setShowEditForm(false);
        props.reload();
    }
    return (
        <div className={`PetCard ${props.species}`}>
            <h3>{props.name} is {props.age} years old!</h3>
            <p>{props.description}</p>
           {props.userId&&<Link to={`/profile/${props.userId}`}>See Owner</Link>}
           {props.canEdit&&!showEditForm &&<button onClick={()=>setShowEditForm(true)}>Show Edit Form</button>}
           {props.canEdit&&showEditForm &&<button onClick={()=>setShowEditForm(false)}>Hide Edit Form</button>}
           {props.canDelete&&<button onClick={deletePet}>Delete</button>}
           {showEditForm &&<EditPetForm {...props} reload={editReload}/>}
        </div>
    )
}
