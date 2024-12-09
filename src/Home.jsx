import React, { useState, useEffect } from "react";
import HomeComponent from "./Components/HomeComponent";
import Inbox from "./Components/Inbox";
import Sidebar from "./Components/Sidebar";
import styled from "styled-components";
import HomeWithoutLogin from "./Components/HomeWithoutLogin";
import { useAuth } from "./Contaxt/AuthContaxt";
import UserData from "./Components/UserData";
import MailInbox from "./Components/mailInbox";

const Home = () => {
  const { isAuthenticated,user} = useAuth();
  // const [isUser , setIsUser] = useState({})
  // console.log(user);
  // useEffect(()=>{
  //   setIsUser(user)
  //   // const loginUserData = localStorage.getItem('user')
  //   // // console.log(JSON.parse(loginUserData));
    
  //   // setIsUser(JSON.parse(loginUserData))
  // },[])
  // console.log(isUser);
  

  return (
    <div>
      <Wrapper>
        {isAuthenticated ? (
          <>
            <div className="container">
              <div className="sidebar">
                {/* <UserData data={isUser} /> */}
                <UserData/>
              </div>
              {user && user?.createdMails && user?.createdMails?.length > 0 ? (
                //  <p>This is a test</p>
                <div className="main-content">
                 <MailInbox data={user}/>
                 </div>
              ) : (
                <div className="main-content">
                  <HomeComponent />
                  {/* <Inbox /> */}
                </div>
               
              )}
            </div>
          </>
        ) : (
          <HomeWithoutLogin />
        )}
      </Wrapper>
    </div>
  );
};
const Wrapper = styled.section`
  .container {
    display: flex;
    flex-direction: row; /* Ensures components are aligned horizontally */
  }

  .sidebar {
    width: 250px; /* Adjust the width as needed */
    position: relative;
    flex-shrink: 0; /* Prevents the Sidebar from shrinking */
  }

  .main-content {
    flex-grow: 1; /* Allows the main content to take up remaining space */
    padding: 20px; /* Optional padding for spacing */
  }
  @media (max-width: 768px) {
    .container {
      display: flex;
      flex-direction: column;
    }
      .sidebar{
      width:100%;
      }
  }
`;
export default Home;
