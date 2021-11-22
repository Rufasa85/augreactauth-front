import React,{useState,useEffect} from 'react'
import "./style.css"
import API from '../../utils/API';
import PetCard from '../../components/PetCard';

function Home(props) {
    const [pets, setPets] = useState([])
    useEffect(()=>{
       loadPets()
    },[])
    const loadPets = ()=>{
        API.getAllPets().then(res=>{
            setPets(res.data);
        })
    }
    return (
        <div className="Home">
            <h1>Home</h1>
            <h2>Check out all these pets!</h2>
            <div className="petsContainer">
                {pets.map(pet=><PetCard reload={loadPets}key={pet.id} id={pet.id} token = {props.token} name={pet.name} description={pet.description} age={pet.age} species={pet.species} userId={pet.UserId} canEdit={props.user.id===pet.UserId} canDelete={props.user.id===pet.UserId}/>)}
            </div>
        </div>
    )
}

export default  Home;