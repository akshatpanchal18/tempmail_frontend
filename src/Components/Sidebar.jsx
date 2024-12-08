import React, { useEffect } from 'react'
import { useState } from 'react';
import { IoMdLogOut } from "react-icons/io";
import styled from 'styled-components'
import UserData from './UserData';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Contaxt/AuthContaxt';

function Sidebar() {
  const {logout} = useAuth();
  const [isMobileView , setIsMobileView] = useState(window.innerWidth<768)
  const [user, setUser] = useState({});

  useEffect(()=>{
    const savedUser = JSON.parse(localStorage.getItem('user'));
    // console.log(savedUser);
    
    if (savedUser) {
     setUser(savedUser)
     
    }
   },[])
  const getUserData = async()=>{
  try {
    const response = await fetch('http://localhost:4000/api/v1/users/current-user',{
      method:"GET",
      headers:{ 'Content-Type': 'application/json' },
      credentials:'include'
    })
    const result = await response.json()
    setUser(result.data)
    localStorage.setItem('user', JSON.stringify(user));
    console.log("username",user);
  } catch (error) { 
  }
}
useEffect(() => {
  getUserData(); 
},[]);


    
  const handleResize = () => {
    setIsMobileView(window.innerWidth < 768);
  };
  useEffect(()=>{
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })
  return (
    <div>
        <Wrapper>
        {/* {
          isMobileView ?(
            
              <div className='user-mobile'>
              <NavLink to='/user-data'>
              <div className='data'>
              <div>
                <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt="" />
              </div>
              <div>
                <p>{user.username}</p>
              <small>{user.email}</small>
              </div>
              
              </div>
              </NavLink>
              <div>
                <IoMdLogOut className='logout' onClick={logout}/>
              </div>
            </div>
          ):( */}
            <UserData data={user}/>
          {/* )
        }
         */}
      </Wrapper>
    </div>
  )
}
const Wrapper = styled.div`
.logout{
font-size:2rem;
margin-left:40px;
color:#007bff;
}
.user-mobile {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Center items vertically */
  padding: 10px; /* Add some padding */
  background-color: #f9f9f9; /* Light background color */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
      width: 100%;
  margin: 10px 63px; /* Space between mobile user cards */
  cursor: pointer; /* Show pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.user-mobile:hover {
  background-color: #e0e0e0; /* Change background on hover */
}

/* Remove text decoration from NavLink */
.user-mobile a {
  text-decoration: none; /* Remove underline from link */
  color: inherit; /* Inherit color from parent */
}

.data {
  display: flex; /* Use flexbox for inner layout */
  align-items: center; /* Center items vertically */
  width:100%;
  margin: 0 auto;
}

.data div {
  margin-right: 10px; /* Space between image and text */
}

.data img {
  width: 50px; /* Set a fixed width for the image */
  height: 50px; /* Set a fixed height for the image */
  border-radius: 50%; /* Circular image */
  object-fit: cover; /* Ensure image covers the area without stretching */
}

.data p {
  font-size: 16px; /* Main username size */
  font-weight: bold; /* Bold font for username */
  color: #333; /* Dark color for contrast */
  margin: 0; /* Remove default margin */
}

.data small {
  font-size: 12px; /* Smaller font for email */
  color: #777; /* Light gray color for email */
  margin: 0; /* Remove default margin */
}

`;
export default Sidebar