import { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import AuthForm from "./Components/Login";
import { AuthProvider } from "./Contaxt/AuthContaxt";
import UserData from "./Components/UserData";
import MailInbox from "./Components/mailInbox";
import Error from "./Components/Error";
function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter  future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthForm />} />
          {/* <Route path="/user-data" element={<UserData />} /> */}
          {/* <Route path="/mail-box/:mailid" element={<MailInbox />} /> */}
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
