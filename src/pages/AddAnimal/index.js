import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom";
import "./style.css"
import API from '../../utils/API';

export default function AddAnimal(props) {
    const [newAnimal, setNewAnimal] = useState({
        name:"",
        age:"",
        species:"",
        description:""

    })
    const history = useHistory();
    useEffect(() => {
        if(!props.token){
            console.log(history)
            history.push("/")
        }
    }, [props.token])

    const handleInputChange= e=>{
        const {name,value} = e.target;
        setNewAnimal({
            ...newAnimal,
            [name]:value
        })
    }

    const handleFormSubmit = e=>{
        e.preventDefault();
        API.addAPet(newAnimal,props.token).then(res=>{
            console.log(res.data);
            history.push("/")
        })
    }


    return (
        <div className="AddAnimal">
            <h1>add Animal!</h1>
            <form onSubmit={handleFormSubmit}>
                <input onChange={handleInputChange} value={newAnimal.name} name="name" placeholder="name"/>
                <input onChange={handleInputChange} value={newAnimal.age} name="age" placeholder="age"/>
                <input onChange={handleInputChange} value={newAnimal.species} name="species" placeholder="species"/>
                <textarea onChange={handleInputChange} name="description" placeholder="description" value={newAnimal.description}></textarea>
                <button>Add Animal!</button>
            </form>
        </div>
    )
}
