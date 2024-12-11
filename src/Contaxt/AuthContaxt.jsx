import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState({});


  // const URL = 'http://localhost:4000/api/v1'
  const URL = 'https://tempmail-server.onrender.com/api/v1'

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      const savedUser = localStorage.getItem('user')
      if(savedUser){
        setUser(JSON.parse(savedUser))
      }
    }
  }, []);

  const login = async (data) => {
    setIsAuthenticated(true);
    // setUserData(data);
    try {
      const response = await fetch(`${URL}/users/current-user`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const result = await response.json();

      if (response.ok) {
        console.log("auth User result", result);

        // Correctly set user data from response
        setUser(result.data); // Make sure result.data contains the user object
        console.log("after setting user", user); // Log the user data directly
        
        // Store in local storage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem('userLoginData', JSON.stringify(data));
        localStorage.setItem('user', JSON.stringify(result.data));

        // Handle created emails if available
        if (result.data.createdMails && result.data.createdMails.length > 0) {
          localStorage.setItem('storedEmail', result.data.createdMails[0].tempEmail);
          localStorage.setItem('storedEmail_ID', result.data.createdMails[0]._id);
        }
      } else {
        console.error('Failed to fetch user details during login', result);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Log the user state whenever it changes
  useEffect(() => {
    console.log("Updated user state:", user);
  }, [user]);

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setUser({});
    // localStorage.removeItem("isAuthenticated");
    // localStorage.removeItem("storedEmail");
    // localStorage.removeItem("storedEmail_ID");
    // localStorage.removeItem("createdEmail");
    // localStorage.removeItem("createdEmail_ID");
    // localStorage.removeItem('userLoginData');
    // localStorage.removeItem('isShow');
    // localStorage.removeItem('user');
    localStorage.clear();
    console.log("Local storage cleared:", localStorage);
  };

  const register = (data) => {
    setIsAuthenticated(true);
    setUserData(data);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem('userRegisterData', JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, user, login, logout, register,URL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
