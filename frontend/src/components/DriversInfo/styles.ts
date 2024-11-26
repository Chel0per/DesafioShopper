import styled from "styled-components";

export const Container = styled.div`

    display: flex;
    flex-direction: column;
    gap: 15px;

`;

export const DriverContainer = styled.div`

    display: flex;
    flex-direction: column;
    width:600px;
    box-sizing: border-box;
    border: 2px solid #0e453a;
    border-radius: 10px;

`;

export const Info = styled.p`

    padding-left: 30px;
    padding-right: 30px;
    font-size: 12px;
    margin: 8px 0

`;

export const ConfirmRideButton = styled.button`

    height: 40px;
    width: 120px;
    background-color: #03a877;
    color:white;
    border:none;
    border-radius: 15px;
    align-self: center;
    cursor:pointer;
    margin-bottom: 8px;

`;