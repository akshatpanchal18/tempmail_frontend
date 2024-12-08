import React from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Styled components for the error page
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa; /* Light background color */
  text-align: center;
  padding: 20px;
`;

const ErrorCode = styled.h1`
  font-size: 72px;
  color: #dc3545; /* Bootstrap danger color */
`;

const ErrorMessage = styled.p`
  font-size: 24px;
  margin: 20px 0;
  color: #333; /* Dark text color */
`;

const ErrorIcon = styled(FaExclamationTriangle)`
  font-size: 80px;
  color: #dc3545; /* Danger color for emphasis */
  margin-bottom: 20px;
`;

const Button = styled(Link)`
  background-color: #007bff; /* Primary color */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;

const Error = () => {
  return (
    <ErrorContainer>
      <ErrorIcon />
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Oops! Something went wrong.</ErrorMessage>
      <ErrorMessage>The page you are looking for does not exist.</ErrorMessage>
      <Button to="/">Go to Home</Button>
    </ErrorContainer>
  );
};

export default Error;
