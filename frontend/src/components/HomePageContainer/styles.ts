import styled from "styled-components";

export const Container = styled.div`

    display:flex;
    flex-direction: column;
    box-sizing: border-box;
    width:768px;
    align-items: center;
    align-self: center;
    border: 2px solid #0e453a;
    border-radius: 10px;
    padding: 30px 0;
    background-color:white;

`;

export const ButtonContainer = styled.div`

    display: flex;
    flex-direction: row;
    padding: 0 150px;
    justify-content: space-between;
    box-sizing: border-box;
    width: 600px;
    margin-bottom: 30px;

`;

export const RoutesButton = styled.button<{pageSection:string}>`

    height: 30px;
    width: 90px;
    background-color: ${({ pageSection }) => (pageSection === "history" ? "#1be0a6" : "#03a877")};
    color:black;
    border: 2px solid black;
    cursor:${({ pageSection }) => (pageSection === "history" ? "pointer" : "default" )};

`;

export const HistoryButton = styled.button<{pageSection:string}>`

    height: 30px;
    width: 90px;
    background-color: ${({ pageSection }) => (pageSection === "routes" ? "#1be0a6" : "#03a877")};
    color:black;
    border: 2px solid black;
    cursor:${({ pageSection }) => (pageSection === "routes" ? "pointer" : "default" )};

`;