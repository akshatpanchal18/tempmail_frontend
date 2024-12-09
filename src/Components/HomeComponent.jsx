import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Inbox from "./Inbox";
import InBoxA from "./InBoxA";

const HomeComponent = () => {
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [emailCreated, setEmailCreated] = useState(false);
  const [isData, setIsData] = useState();
  const [isShow, setIsShow] = useState(false);
  const [isId, setIsId] = useState("");

  const navigate = useNavigate();

  const handleCreateEmail = async () => {
    if (isValid && username !== "") {
      const email = `${username}@temp.com`;
      console.log("Generated Email:", email);

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/email/create-email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tempEmail: email }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        // console.log("Received Data:", data);

        // Update state
        setIsData(data.data);
        // Update other states
        localStorage.setItem("createdEmail", email); // Save email to localStorage
        localStorage.setItem("createdEmail_ID", data.data.newEmail._id); // Save email_id to localStorage
        localStorage.setItem("isShow", "true"); // Save isShow state
        setEmailCreated(true); // Mark email as created
        setIsShow(true); // Show success message or UI
      } catch (error) {
        console.error("Error creating email:", error.message);
      }
    }
  };

  // Check if email exists in localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem("createdEmail");
    const storedId = localStorage.getItem("createdEmail_ID");
    const inboxVisible = localStorage.getItem("isShow");
    // console.log("storedId", storedId);
    if (storedEmail) {
      setEmailCreated(true);
      setIsData(storedId); // Populate isData with stored data
    }

    if (inboxVisible === "true") {
      setIsShow(true);
    }
  }, [isData]);

  // console.log("isData", isData);

  // Validate username to ensure it contains only alphanumeric characters
  const validateUsername = (value) => /^[a-zA-Z0-9]*$/.test(value);
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (validateUsername(value)) {
      setUsername(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // console.log("Data After initializ:", isData);
  // console.log(isData.newEmail._id);

  const id = isData?.newEmail?._id;

  const handelDeletEmail = () => {
    localStorage.removeItem("createdEmail");
    localStorage.removeItem("isShow");
    localStorage.removeItem("createdEmail_ID");
    setEmailCreated(false);
    setUsername("");
  };

  return (
    <>
      <Wrapper>
        <div className="home">
          {/* Email input section */}
          {!emailCreated ? (
            <>
              <h2>Welcome to Our Temporary Email Service</h2>
              <div className="email-input">
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter username"
                  disabled={emailCreated} // Disable input once email is created
                />
                <span>@temp.com</span>
                <button
                  onClick={handleCreateEmail}
                  className="create-btn"
                  disabled={emailCreated}
                >
                  Create
                </button>
              </div>
            </>
          ) : (
            <div className="created-email">
              {/* Display the created email */}
              <p>
                Your email address:{" "}
                <strong>{localStorage.getItem("createdEmail")}</strong>
              </p>
              <button onClick={handelDeletEmail}><MdDeleteForever className='del-btn'/></button>
            </div>
          )}

          {!isValid && username && (
            <p className="error">
              Username can only contain alphanumeric characters (letters and
              numbers).
            </p>
          )}
        </div>
      </Wrapper>
      {isShow ? (
        <>
          {/* data */}
          <Inbox emailId={isData} />
          {/* <InBoxA id = {id}/> */}
        </>
      ) : (
        <div>
          <h2 style={{ textAlign: "center" }}>Please create email first</h2>
        </div>
      )}
    </>
  );
};

const Wrapper = styled.section`
  /* Home.css */
  .home {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    // box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.6);
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
  }

  /* Email Input Section */
  .email-input {
    margin-top: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    border: 3px dashed #a1a1a1;
  }

  .email-input input {
    width: 60%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .email-input span {
    padding-left: 0.5rem;
    font-size: 1rem;
    color: #555;
  }

  .email-input button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .email-input button:hover {
    background-color: #0056b3;
  }

  .email-input button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  /* Error Message */
  .error {
    color: red;
    font-size: 0.9rem;
  }

  /* Created Email Section (shown after email creation) */
  .created-email {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-around;
    background-color: #f3f4f6;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    font-size: 1.1rem;
    color: #333;
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

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .home {
      padding: 1rem;
    }

    .email-input {
      flex-direction: column;
      align-items: stretch;
    }

    .email-input input {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    .email-input button {
      margin-left: 0;
    }
    .email-input span {
      margin-top: 0.5rem;
    }

    .created-email {
      font-size: 1rem;
    }

    .inbox h3 {
      font-size: 1.2rem;
    }

    .inbox-list {
      grid-template-columns: 1fr;
    }

    .inbox-card {
      padding: 0.8rem;
      font-size: 0.9rem;
    }

    .inbox-card-header h4 {
      font-size: 1rem;
    }

    .message-preview {
      font-size: 0.9rem;
    }

    .read-btn {
      padding: 0.4rem 0.8rem;
    }
    .created-email button {
      padding: 2px 3px;
    }
    .created-email .del-btn {
      font-size: 1.5rem;
      color: white;
    }
  }
`;
export default HomeComponent;
