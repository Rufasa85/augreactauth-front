import React,{useState,useEffect} from 'react'
import "./style.css"
import API from '../../utils/API';
import PetCard from '../../components/PetCard';

function Home() {
    const [pets, setPets] = useState([])
    useEffect(()=>{
        API.getAllPets().then(res=>{
            setPets(res.data);
        })
    },[])
    return (
        <div className="Home">
            <h1>Home</h1>
            <h2>Check out all these pets!</h2>
            <div className="petsContainer">
                {pets.map(pet=><PetCard key={pet.id} name={pet.name} description={pet.description} age={pet.age} species={pet.species}/>)}
            </div>
        </div>
    )
}

export default  Home;