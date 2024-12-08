import React,{createContext, useContext, useEffect, useState} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

     const [isAuthenticated ,setIsAuthenticated] = useState(false)
     const [userData , setUserData] = useState(null)
     const [user, setUser] = useState({});
     useEffect(() => {
       const storedAuth = localStorage.getItem('isAuthenticated')
       if(storedAuth === "true"){
        setIsAuthenticated(true)
        const storedUserData = localStorage.getItem('userData');
        if(storedAuth=== "true"){
            setUserData(JSON.parse(storedUserData))
           }
       }
      
     }, [])
     
    
     

     const login = (data)=>{
      const getUserData = async()=>{
        try {
          const response = await fetch('http://localhost:4000/api/v1/users/current-user',{
            method:"GET",
            headers:{ 'Content-Type': 'application/json' },
            credentials:'include'
          })  
          const result = await response.json()
          setUser(result.data)
          console.log("result", user)
          console.log("user", user.createdMails[0].tempEmail)
          console.log("user.createdMails._id", user.createdMails[0]._id)
          // localStorage.setItem('user', JSON.stringify(user));
          // console.log("username",user);
        } catch (error) { 
        }
      }
      getUserData

        setIsAuthenticated(true)
        setUserData(data)
        localStorage.setItem("isAuthenticated","true")
        localStorage.setItem('userData', JSON.stringify(data))
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('createdEmail', JSON.stringify(user.createdMails[0].tempEmail))
        localStorage.setItem('createdEmail_ID', JSON.stringify(user.createdMails[0]._id))
     }

     const logout = ()=>{
        setIsAuthenticated(false)
        setUserData(null)
        localStorage.removeItem("isAuthenticated")
        localStorage.removeItem("createdEmail")
        localStorage.removeItem("createdEmail_ID")
        localStorage.removeItem('userData')
        localStorage.removeItem('isShow') 
        localStorage.removeItem('user') 
     }

     const register = (data) =>{
        setIsAuthenticated(true)
        setUserData(data)
        localStorage.setItem("isAuthenticated","true")
        localStorage.setItem('userData', JSON.stringify(data))
     }
     return (
        <AuthContext.Provider value={{ isAuthenticated, userData, user,login, logout, register }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => useContext(AuthContext);