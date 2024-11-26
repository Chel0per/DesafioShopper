import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    width: 600px;
    height: 400px;
    border: 2px solid #0e453a;
    background-color: #a8dac9;
    margin-top: 30px; 
`;

export const Spinner = styled.div`
    width: 40px;
    height: 40px;
    border: 4px solid transparent;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;
