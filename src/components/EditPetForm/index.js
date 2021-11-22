import React,{useState} from "react";
import API from "../../utils/API"

export default function EditPetForm(props){
    const [pet,setPet] = useState({
        name:props.name,
        species:props.species,
        description:props.description,
        age:props.age
    })

    const handleInputChange= e=>{
        const {name,value} = e.target;
        setPet({
            ...pet,
            [name]:value
        })
    }

    const handleFormSubmit = e=>{
        e.preventDefault();
        console.log(pet);
        API.editAPet(pet,props.id,props.token).then(res=>{
            console.log(res.data);
            props.reload();
        })
    }


    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input onChange={handleInputChange} value={pet.name} name="name" placeholder="name"/>
                <input onChange={handleInputChange} value={pet.age} name="age" placeholder="age"/>
                <input onChange={handleInputChange} value={pet.species} name="species" placeholder="species"/>
                <textarea onChange={handleInputChange} name="description" placeholder="description" value={pet.description}></textarea>
                <button>Edit Animal!</button>
            </form>
        </div>
    )
}