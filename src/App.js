import React, {useState,useEffect} from "react";
import API from "./utils/API"
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import {BrowserRouter as Router, Switch,Route,Link,Redirect} from "react-router-dom"
import Home from "./pages/Home";
import AddAnimal from "./pages/AddAnimal";

function App() {
  const [userState,setUserState]= useState({
    email:"",
    id:0
  })
  const [token,setToken] = useState("")
  const [loginFormState,setLoginFormState] = useState ({
    email:"",
    password:""
  })
  const [signupFormState,setSignupFormState] = useState ({
    email:"",
    password:""
  })

  useEffect(()=>{
    const myToken = localStorage.getItem("token");
    console.log("use effected")
    console.log(myToken)
    if(myToken){
      API.getProfile(myToken).then(res=>{
        console.log("worked")
        setToken(myToken)
        setUserState({
          email:res.data.email,
          id:res.data.id
        })
      }).catch(err=>{
        console.log("failed")
        console.log(err)
        localStorage.removeItem('token')
      })
    }
  },[])

  const handleLoginChange = event=>{
    if(event.target.name==="email"){
      setLoginFormState({
        ...loginFormState,
        email:event.target.value
      })
    } else {
      setLoginFormState({
        ...loginFormState,
        password:event.target.value
      })
    }
  }
  const handleSignupChange = event=>{
    if(event.target.name==="email"){
      setSignupFormState({
        ...signupFormState,
        email:event.target.value
      })
    } else {
      setSignupFormState({
        ...signupFormState,
        password:event.target.value
      })
    }
  }

  const handleLoginSubmit =e=> {
    e.preventDefault();
   API.login(loginFormState).then(res=>{
      console.log(res.data)
      setUserState({
        email:res.data.user.email,
        id:res.data.user.id
      })
      setToken(res.data.token)
      localStorage.setItem("token",res.data.token)
    }).catch(err=>{
      console.log(err);
    })

  }
  const handleSignupSubmit =e=> {
    e.preventDefault();
   API.signup(signupFormState).then(res=>{
     API.login(signupFormState).then(res=>{
      console.log(res.data)
      setUserState({
        email:res.data.user.email,
        id:res.data.user.id
      })
      setToken(res.data.token)
      localStorage.setItem("token",res.data.token)
    }).catch(err=>{
      console.log(err);
    })
  })
  }

  const logMeOut = ()=>{
    setUserState({email:'',id:0})
    setToken("");
    localStorage.removeItem("token")
  }

  return (

      <Router>
    {!userState.email?(
    <div>
      <LoginForm submit={handleLoginSubmit} change={handleLoginChange} loginState={loginFormState}/>
      <SignupForm  submit={handleSignupSubmit} change={handleSignupChange} signupState={signupFormState} />
      </div>
      ):(
    <div>

      <h1>Welcome, {userState.email}! You are user number {userState.id}</h1>
      <button onClick = {logMeOut}>Logout</button>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/addanimal">/New Animal</Link>
    </div>
    )}
    <Switch>
      <Route  exact path="/">
        <Home/>
      </Route>
      <Route exact path="/profile">
        <h1>profile Page</h1>
      </Route>
      <Route exact path="/addanimal">
       {token?<AddAnimal user={userState} token={token}/>:<Redirect to="/"/>}
      </Route>
    </Switch>
    </Router>

  );
}

export default App;
