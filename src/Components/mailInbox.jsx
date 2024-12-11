import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Inbox from "./Inbox";
import { MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";
import InBoxA from "./InBoxA";

function MailInbox() {
  const [getUserEmail, setGetUserEmail] = useState(""); // Initialize as an empty string
  const [getUserEmailId, setGetUserEmailId] = useState(""); // Initialize as an empty string

  useEffect(() => {
    const userMail = localStorage.getItem("storedEmail");
    const userMailId = localStorage.getItem("storedEmail_ID");

    // console.log("Stored Email from Local Storage:", userMail);
    // console.log("Stored Email ID from Local Storage:", userMailId);
  
    if (userMail) {
      try {
        setGetUserEmail(JSON.parse(userMail)); // Try parsing if it's JSON
      } catch {
        setGetUserEmail(userMail); // Use it as a plain string
      }
    }
    if (userMailId) {
      try {
        setGetUserEmailId(userMailId); // Try parsing if it's JSON
      } catch {
        setGetUserEmailId(userMailId); // Use it as a plain string
      }
    }
  }, []);
  

  // console.log("getUserEmail", getUserEmail,"Type:", typeof getUserEmail);
  // console.log("getUserEmailId", getUserEmailId,"Type:", typeof getUserEmailId);
  return (
    <div>
      <Wrapper>
        <div className="created-email">
          {getUserEmail ? (
            <p>
              Your email address: <strong>{getUserEmail}</strong>
            </p>
          ) : (
            // <p>Your email address: <strong>xyz@gmail.com</strong></p>

            <p>Loading...</p>
          )}
          {/* <button><MdDeleteForever className='del-btn'/></button> */}
        </div>
        {/* <Inbox/> */}
      </Wrapper>
      {/* <InBoxA id = {id}/> */}
      <Inbox emailId={getUserEmailId} />
    </div>
  );
}

const Wrapper = styled.div`
  .created-email {
    display: flex;
    justify-content: space-around;
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    font-size: 1.1rem;
    color: #333;
    max-width: 700px;
    margin: 1.5rem auto;
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.4);
  }
  .created-email button {
    border: none;
    outline: none;
    background: red;
    border-radius: 6px;
    padding: 2px;
  }
  .created-email button:hover {
    background: #610903;
  }
  .created-email .del-btn {
    font-size: 1.5rem;
    color: white;
  }
  .created-email strong {
    color: #007bff;
  }
  @media (max-width: 768px) {
    .created-email {
      flex-direction: column; /* Stack items vertically */
      align-items: center; /* Center items */
      padding: 1rem; /* Reduce padding */
      font-size: 1rem; /* Adjust font size for mobile */
      box-shadow: none; /* Optional: Remove shadow on mobile */
      margin: 0.5rem auto;
    }

    .created-email p {
      margin: 0.5rem 0; /* Add margin between paragraphs */
    }
  }
`;

export default MailInbox;
