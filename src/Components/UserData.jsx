import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../Contaxt/AuthContaxt";

function UserData({ data }) {
  const [isData, setIsData] = useState(null);
  // console.log(isData);

  const { logout } = useAuth();
  // console.log("UserData:",data);
  useEffect(() => {
    const savedData = localStorage.getItem("user");
    if (savedData) {
      const parsedData = JSON.parse(savedData); // Parse the saved string
      setIsData(parsedData); // Set parsed data to state
    }
  }, []);
  useEffect(() => {
    if (data) {
      setIsData(data); // Update state with passed data
    }
  }, [data]);

  if (!isData) {
    return (
      <Wrapper>
        <p>Loading user data...</p>
      </Wrapper>
    );
  }
  // console.log("createdMails",data.createdMails[0]._id);

  return (
    // <div>
    <Wrapper>
      <div className="body">
        <div className="container">
          <div className="header">
            <h4>
              Welcome,
              <span style={{ textTransform: "capitalize" }}>
                {isData.username}
              </span>
            </h4>
            {/* <p><MdEdit className='edit'/></p> */}
          </div>
          <div className="user-img">
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              alt="User"
            />
            <div className="m-data">
              <strong>@{isData.username}</strong>
              <p>{isData.email}</p>
            </div>
            <div>
              <IoMdLogOut className="logout" onClick={logout} />
            </div>
          </div>
          <div className="user-data">
            <h4>Created temp mail's:</h4>
            {isData.createdMails && isData.createdMails.length > 0 ? (
              isData.createdMails.map((mail, index) => (
                // <NavLink key={mail._id} to={`/mail-box/${mail._id}`}>
                <div key={mail._id} className="mails">
                  <p>{mail.tempEmail} </p>
                  {/* <MdDelete className='delete' id={mail._id}/> */}
                </div>
                // </NavLink>
              ))
            ) : (
              <p>No temporary emails created yet.</p>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  /* Reset some basic default styles */

  /* Container to center content and add spacing */
  .container {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 4rem 2rem;
    padding: 20px 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  /* Header styles */
  .header {
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .header h4 {
    font-size: 24px;
    color: #037ffc; /* Blue color */
    margin: 10px 10px;
  }

  /* User image section styles */
  .user-img {
    text-align: center;
    margin-bottom: 30px;
    width: 100%;
  }
  .logout {
    display: none;
  }
  .user-img img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .user-img p {
    font-size: 14px;
    color: #555;
  }

  /* User data section styles */
  .user-data {
    background-color: #f9f9f9;
    padding: 20px;
    width: 100%;
    border-radius: 8px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .user-data h4 {
    margin-bottom: 5px;
  }

  .user-data p {
    font-size: 16px;
    color: #444;
    margin-bottom: 10px;
    background: #dcdee0;
    padding: 5px;
    border-radius: 8px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  .mails {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    margin: auto 0;
  }
  .user-data a {
    text-decoration: none;
  }
  .delete {
    margin-left: 20px;
    font-size: 1.3rem;
  }
  .user-data p:hover {
    background: #a9aaab;
    color: black;
  }

  /* Specific styling for the temp mail list */
  .user-data p:first-child {
    font-weight: bold;
    color: #333;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .container {
      margin: 0.2rem auto; /* Center the container on smaller screens */
      flex-direction: row; /* Stack elements vertically */
      // border-radius: 10px; /* Rounded corners for the container */
      box-shadow: none; /* Remove shadow for a flatter design */
      width: fit-content;
      // display:none;
    }

    .header {
      display: none;
    }

    .user-img {
      display: flex; /* Use flexbox to align image and text */
      align-items: center; /* Center items vertically */
      justify-content: center; /* Center items horizontally */
      margin: 15px; /* Adjust bottom margin */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      padding: 0.5rem 1rem;
      border-radius: 10px;
      width: fit-content;
    }
    .m-data {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .logout {
      display: flex;
      font-size: 2rem;
      margin-left: 40px;
      color: #007bff;
    }
    .user-img img {
      width: 70px; /* Smaller image size on mobile */
      height: 70px; /* Adjust height for mobile */
      margin-right: 10px; /* Space between image and text */
    }

    .user-img p {
      font-size: 16px; /* Adjust font size for the username */
      // font-weight: bold; /* Make username bold */
    }

    .user-data {
      display: none;
    }
  }
`;
export default UserData;
