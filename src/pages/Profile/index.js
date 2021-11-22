import React, {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import API from '../../utils/API';
import PetCard from '../../components/PetCard';
import "./style.css"

export default function Profile(props) {
    const [user, setUser] = useState({
        email:"",
        id:"",
        Pets:[]
    })
    const {id} = useParams();
    useEffect(()=>{
        loadUser()
    },[id])

    const loadUser = ()=>{
        API.getUserData(id).then(res=>{
            if(res.data){
                setUser(res.data);
            }
        })
    }
    return (
        <div>

        {!user.email?<h1>No such user!</h1>:(
            <div>
            <h1>{user.email}'s profile!</h1>
            <div className="petContainer">
                {user.Pets.map(pet=><PetCard reload={loadUser} key={pet.id} id={pet.id} token={props.token} name={pet.name} description={pet.description} age={pet.age} species={pet.species} canEdit={props.user.id===pet.UserId} canDelete={props.user.id===pet.UserId}/>)}
            </div>
        </div>
        )}
        </div>
    )
}
