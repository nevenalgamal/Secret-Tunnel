import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
   const signup = async( username )=>{
     try{
      const response = await fetch(`${API}/signup` ,{
        method : "POST",
        headers :{"content-type" : "application/json"},
        body:    JSON.stringify({username})
      })
        const result = await response.json()
       if (!response.ok) throw Error (result.message);
        setToken(result.token)
        setLocation("TABLET")
     }catch (e){
      console.log(e)
     }
   }
  // TODO: authenticate

const authenticate = async()=> {
  if (!token) throw Error ("no token")
    try{ 
    const response = await fetch(`${API}/authenticate`,{
      method:"GET",
      headers : {"content-type":"application/json",
      "Authorization": `Bearer ${token}`}
    })
    const result = await response.json()
    if(!response.ok) throw Error(result.message)
      setLocation("TUNNEL")
  }catch(e){
    console.log(e);
    throw e;

  }
}
  const value = { location, signup, token,authenticate};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
