import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contaxt/AuthContaxt";
import Cookies from "js-cookie";

// Getting a cookie

function AuthForm() {
  const navigate = useNavigate();
  const { login ,URL} = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [step, setStep] = useState("details");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    email: "",
    username: "",
    password: "",
  });
  // const [otpVerified , setOtpVerified] = useState(false)
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(false);

  // console.log(URL);
  

  const handleLoginSubmit = async () => {
    setError(""); // Clear previous errors
    setLoading(true)
    try {
      const response = await fetch(`${URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) {
        switch (response.status) {
          case 400:
            setError("Bad request. Please check your inputs.");
            setLoading(false)
            break;
          case 401:
            setError("Unauthorized! Invalid credentials.");
            setLoading(false)
            break;
          case 404:
            setError("User not found. Please register first.");
            setLoading(false)
            break;
          case 500:
            setError("Server error. Please try again later.");
            setLoading(false)
            break;
          default:
            setError(result.message || "An unknown error occurred.");
        }
        return; // Exit early if there's an error
      }
      if(response.status === 200){
        login(loginData);
        setLoading(false)
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while logging in.");
    }
  };

  const handleSignUpSubmit = async () => {
    setError(""); // Clear previous errors
    setLoading(true);
    try {
      const response = await fetch(
        `${URL}/users/register/temp-user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signUpData),
          credentials: "include", // Uncomment if you need cookies for sign-up
        }
      );
      const result = await response.json();
      if (!response.ok) {
        switch (response.status) {
          case 400:
            setError("Bad request. Please check your inputs.");
            setLoading(false)
            break;
          case 401:
            setError("Invalid OTP.");
            setLoading(false)
            break;
          case 402:
            setError("OTP expired.");
            setLoading(false)
            break;
          case 403:
            setError("Username or email already exist.");
            setLoading(false)
            break;
            default:
            setError(result.message || "An unknown error occurred.");
        }
        return; // Exit early if there's an error
      }
      if(response.status === 200){
        setLoading(true)
        setStep("otp");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during sign-up.");
    } finally {
      setLoading(false); // Hide the loading indicator
    }
  };

  const handleOtpSubmit = async () => {
    setLoading(true);
    setSuccess(false); // Reset success state on new request
    setError(null); // Clear any previous error messages
    try {
      const response = await fetch(
        `${URL}/users/register/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ otp }),
          credentials: "include",
        }
      );
      const result = await response.json();
      if (!response.ok) {
        switch (response.status) {
          case 400:
            setError("Bad request. Please check your inputs.");
            setLoading(false)
            break;
          case 401:
            setError("Invalid OTP.");
            setLoading(false)
            break;
          case 402:
            setError("OTP expired.");
            setLoading(false)
            break;
            default:
            setError(result.message || "An unknown error occurred.");
        }
        return; // Exit early if there's an error
      }
      if(response.status === 201){
        setLoading(false);
        setSuccess(true); // Set success to true on successful verification
        setSignUpData("");
        setLoginData({
          email:signUpData.email,
          password:signUpData.password
        })
        setTimeout(() => {
          setActiveTab('login'); // Switch to the login tab
        }, 2000);
        setOtp('')
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Stop loading on error
      setError("An error occurred during OTP verification.");
    }
  };
 
  
  return (
    <Wrapper>
      <div className="auth-form-container">
        <div className="auth-tabs">
          <button
            onClick={() => {
              setActiveTab("login");
              setStep("details");
            }}
            className={activeTab === "login" ? "active" : ""}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab("signup");
              setStep("details");
            }}
            className={activeTab === "signup" ? "active" : ""}
          >
            Sign Up
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {/* Display error message */}
        {activeTab === "login" && (
          <div className="auth-form">
            {/* <h2>Login</h2> */}
            <input
            id="login-email"
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
            id="login-email-password"
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            {
              loading ?(
              <>
                <div className="dots"></div>
              </>
              ):(
                <></>
              )
            }
            <button className="form-btn" onClick={handleLoginSubmit}>
              Login
            </button>
          </div>
        )}
        {activeTab === "signup" && (
          <div className="auth-form">
            {step === "details" && (
              <>
                {/* <h2>Sign Up</h2> */}
                <input
                id="signup-email"
                  type="email"
                  placeholder="Email"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                />
                <input
                id="signup-username"
                  type="text"
                  placeholder="Username"
                  value={signUpData.username}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, username: e.target.value })
                  }
                />
                <input
                id="signup-email-password"
                  type="password"
                  placeholder="Password"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                />
                {loading ? (
                  <>
                    {/* <p style={{ color: "#007bff" }}>Loading ...</p> */}
                    <div className="dots"></div>
                    <p style={{ color: "#007bff" }}>sending OTP ...</p>
                  </>
                ) : (
                  <>
                    {/* <p>OTP sent to your email</p> */}
                    <p></p>
                  </>
                )}
                <button className="form-btn" onClick={handleSignUpSubmit}>
                  Submit
                </button>
              </>
            )}

            {step === "otp" && (
              <>
                <h2>Enter OTP</h2>
                <input
                id="signup-email-otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                  {/* <p>Request New OTP...</p> */}
                {loading && <p style={{ color: "#007bff" }}>Verifying...</p>} 
                {success && <p style={{ color: "green" }}>Registration Success</p>}
                <button className="form-btn" onClick={handleOtpSubmit}>
                  Verify OTP
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* Container for the entire form */
  //loader
  .dots {
  position: relative;
    left: 45%;
    margin: 10px 0;
   width: 13.4px;
   height: 13.4px;
   border-radius: 50%;
   clip-path: inset(-28px -112px);
   color: #007bff;
   box-shadow: 21.3px -44.8px,42.6px -44.8px,63.8px -44.8px;
   transform: translateX(-42.6px);
   animation: dots-y3c9ksmd 1s infinite;
}

@keyframes dots-y3c9ksmd {
   16.67% {
      box-shadow: 21.3px 0px,42.6px -44.8px,63.8px -44.8px;
   }

   33.33% {
      box-shadow: 21.3px  0px,42.6px   0px,63.8px -44.8px;
   }

   45%, 55% {
      box-shadow: 21.3px  0px,42.6px   0px,63.8px   0px;
   }

   66.67% {
      box-shadow: 21.3px 44.8px,42.6px   0px,63.8px   0px;
   }

   83.33% {
      box-shadow: 21.3px 44.8px,42.6px  44.8px,63.8px   0px;
   }

   100% {
      box-shadow: 21.3px 44.8px,42.6px  44.8px,63.8px  44.8px;
   }
}

  .auth-form-container {
    width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.4);
    background: #fff;
    // background:#c2dcff;
    font-family: Arial, sans-serif;
  }

  /* Tabs for switching between login and sign up */
  .auth-tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .auth-tabs button {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    border-bottom: 2px solid transparent;
    background: #f9f9f9;
    transition: all 0.3s ease;
    border-radius: 4px;
  }

  .auth-tabs .active {
    border-bottom: 2px solid #007bff;
    // background: #fff;
    background:#cce4fc;
  }

  /* Input fields styling */
  .auth-form input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    // border:none;
    // outline:none;
    border-radius: 4px;
    // box-shadow:inset 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  .auth-form p {
    text-align: center;
    font-size: 1rem;
  }
  /* Button styling */
  .form-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .form-btn:hover {
    background-color: #0056b3;
  }

  /* Error message styling */
  .error-message {
    color: red;
    margin-bottom: 10px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .auth-form-container {
      width: 350px;
      padding: 1rem 2rem;
    }
  }
`;

export default AuthForm;
