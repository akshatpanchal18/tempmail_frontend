import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  MdOutlineRefresh,
  MdCleaningServices,
  MdEmail,
  MdClose,
} from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEnvelopeOpenText } from "react-icons/fa";
import Timestamp from "../Utils/TimeStamps";
import { useAuth } from "../Contaxt/AuthContaxt";

function Inbox({ emailId }) {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inbox, setInbox] = useState([]);
  const [isData, setIsData] = useState(null);
  const { URL } = useAuth();

  const m_id = useMemo(() => emailId, [emailId]);

  const getInboxdetails = async () => {
    try {
      // console.log("Fetching inbox details...");
      const response = await fetch(`${URL}/inbox/inbox-data/mail/inboxes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mailid: m_id }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setIsData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (m_id) {
      getInboxdetails();
    }
  }, [m_id]);
  

  useEffect(() => {
    if (isData?.messages) {
      const sorted = [...isData.messages].sort(
        (a, b) => new Date(b.receivedAt) - new Date(a.receivedAt)
      );
      setInbox(sorted);
    }
  }, [isData]);
  const emailCount = inbox?.length || 0;
  const handleView = (email, id) => {
    // Toggle email details visibility
    setSelectedEmail(selectedEmail?._id === email._id ? null : email);
  };

  const handleRefresh = () => {
    setLoading(true);
    window.location.reload(); // Keep only if needed
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleDeleteAll = () => {
    setInbox([]);
    setSelectedEmail(null);
  };
  return (
    <Wrapper>
      <div className="inbox">
        <div className="inbox-items">
          <h3>
            Your Inbox <MdEmail className="email-icon" />
            <span className="email-count">{emailCount}</span>
          </h3>
          <div className="items">
            <span className="tooltip-container" onClick={handleRefresh}>
              <MdOutlineRefresh className="refresh" />
              <div className="tooltip">
                <p>{loading ? "Refreshing..." : "Refresh"}</p>
              </div>
            </span>
            <span className="tooltip-container" onClick={handleDeleteAll}>
              <MdCleaningServices className="clear-all" />
              <div className="tooltip">
                <p>Delete All</p>
              </div>
            </span>
          </div>
        </div>

        <div className="inbox-list">
          <p style={{ textAlign: "center", color: "GrayText" }}>
            "if mail not reflect in inbox please refresh"
          </p>
          {emailCount > 0 ? (
            inbox &&
            inbox.map((message) => (
              <div key={message._id} className="inbox-card">
                <div className="inbox-card-header">
                  {/* <h4>{message?.subject || "No Subject"}</h4> */}
                  {/* <h4>Verification</h4> */}
                  <span className="timestamp">
                    <Timestamp timestamp={message.receivedAt} />
                    {/* <p>1m ago</p> */}
                  </span>
                </div>
                <div className="inbox-card-body">
                  <p className="message-preview">From: {message.from}</p>
                  <p className="message-preview">
                    Preview: {message.text.slice(0, 50)}...
                  </p>
                  {/* <p className="message-preview">From: abc@gmail.com</p> */}
                </div>
                <div className="inbox-card-footer">
                  <button
                    className="read-btn"
                    onClick={() => handleView(message, message._id)}
                  >
                    {selectedEmail?._id === message._id ? "Hide" : "View"}
                  </button>
                </div>
                {selectedEmail?._id === message._id && (
                  <div className="email-details">
                    <div className="email-header">
                      <h4>
                        <strong>From:</strong> {selectedEmail.from}
                        {/* <strong>From:</strong>  */}
                      </h4>
                      <div className="close-div">
                        <span>
                          {/* <Timestamp timestamp={message.receivedAt} /> */}
                        </span>

                        {/* <span>1m ago</span> */}
                        {/* <p onClick={() => setSelectedEmail(null)}>
                          <MdClose />
                        </p> */}
                      </div>
                    </div>
                    <div className="email-body">
                      <p>
                        <strong>Subject:</strong> {selectedEmail.subject}
                        {/* <strong>Subject:</strong>  */}
                      </p>
                      <p>{selectedEmail.text}</p>
                      <a
                        href={selectedEmail.html}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedEmail.html}
                      </a>

                      {/* <p>Text:</p> */}
                    </div>
                    <p>
                      <RiDeleteBin5Line className="delete" />
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-data">
              <FaEnvelopeOpenText />
              <p>No messages yet.</p>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  /* Inbox Section */
  .inbox {
    margin-top: 2rem;
    padding: 1rem;
    text-align: left;
    max-width: 800px;
    margin: 1rem auto;
    // background:#ededed;
    // background:#edf5fc; blue
    background: #f0f0f0;
    border-radius: 20px;
    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.4);
  }

  .inbox h3 {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
  }
  .email-icon {
    font-size: 2.5rem;
    margin-left: 10px;
  }

  .email-count {
    background-color: #ff4b5c;
    color: white;
    font-size: 0.9rem;
    padding: 5px 10px;
    border-radius: 50%;
    margin-left: 10px;
    display: inline-block;
    min-width: 25px;
    text-align: center;
    position: relative;
    left: -25px;
    top: -8px;
  }
  .inbox-items {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    background: white;
  }

  .items span {
    font-size: 1.5rem;
    background: #ebe6e6;
    margin: 0 10px;
    padding: 4px;
    border-radius: 5px;
  }

  /* Tooltip Styling */
  .tooltip-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .tooltip {
    font-size: small;
    visibility: hidden;
    width: 50px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip-container:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
  .clear-all {
    // background:red;
    color: red;
  }
  .refresh {
    color: #056ef7;
  }

  /* Inbox Cards */
  .inbox-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    max-height: 400px; /* Set max height for the list */
    overflow-y: auto; /* Enable vertical scrolling */
    border-radius: 10px;
    padding: 2rem 0;
  }
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #c4c4c4;
  }
  .inbox-card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    transition: box-shadow 0.3s ease;
  }

  .inbox-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .inbox-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .inbox-card-header h4 {
    font-size: 1.2rem;
    color: #333;
    margin: 0;
  }

  .timestamp {
    font-size: 0.85rem;
    color: #888;
  }

  .inbox-card-body {
    margin-top: 1rem;
  }

  .message-preview {
    font-size: 1.2rem;
    // color: #555;
    color: black;
    margin-bottom: 1rem;
  }

  .inbox-card-footer {
    display: flex;
    justify-content: flex-end;
  }

  .read-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .read-btn:hover {
    background-color: #0056b3;
  }

  // email details

  .email-details {
    background-color: #edf5fc;
    padding: 20px;
    margin-top: 10px;
    border-radius: 8px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 719px;
    word-wrap: break-word; /* Ensures words break to fit within the container */
    overflow-wrap: break-word; /* Handles long unbroken strings */
    white-space: pre-wrap; /* Preserves formatting while allowing line breaks */
    display: -webkit-box; /* Use Webkit box model (works in modern browsers) */
    -webkit-box-orient: vertical;
  }
  .email-body {
    max-width: 100%;
  }
  .email-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .email-header p {
    // font-size: 1.5rem;
    font-size: clamp(12px, 5vw, 18px);
    // color:#007bff;
    color: black;
    cursor: pointer;
  }
  .close-div {
    display: flex;
    gap: 10px;
  }
  .delete {
    font-size: 1.5rem;
    color: #ed1602;
    position: relative;
    top: 10px;
    left: 97%;
  }

  /* Mobile view styling */
  @media (max-width: 768px) {
    .inbox {
      padding: 1rem;
    }
    .inbox-items{
    padding:0.5rem;
    }
    .email-icon{
    margin-left:6px;
    }
    .inbox h3 {
      font-size: 1.2rem;
    }

    .inbox-list {
      grid-template-columns: 1fr;
      max-height: 300px; /* Smaller max height on mobile */
    }

    .inbox-card {
      padding: 0.8rem;
      font-size: 0.9rem;
      max-width: 275px;
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

    .items span {
      font-size: 1rem;
      background: #ebe6e6;
      margin: 0 5px;
      padding: 5px;
      border-radius: 5px;
    }
  }
`;

export default Inbox;
