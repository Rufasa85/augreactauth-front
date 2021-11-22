import axios from "axios";
//local
const URL_PREFIX = "http://localhost:3001"
//delploy
// const URL_PREFIX = "https://reactauthdemo-back.herokuapp.com"

const API = {
    getProfile: (tkn)=>{
        return axios.get(`${URL_PREFIX}/profile`,{headers:{
        "Authorization": `Bearer ${tkn}`
      }})
    },
    login:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/login`,usrData)
    },
    signup:(usrData)=>{
        return  axios.post(`${URL_PREFIX}/signup`,usrData)
    },
    getAllPets:()=>{
        return axios.get(`${URL_PREFIX}/api/pets`)
    },
    addAPet:(petData,token)=>{
        return axios.post(`${URL_PREFIX}/api/pets`,petData,{
            headers:{
                "Authorization": `Bearer ${token}`
              }
        })
    }
}

export default API;