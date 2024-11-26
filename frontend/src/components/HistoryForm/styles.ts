import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width:600px;
    flex-direction: column;
    align-items: center;
    gap: 10px
`;

export const StyledInput = styled.input`
    width:350px;
    height:40px;
    font-size: 18px;
    border-radius: 5px;
    border: 2px solid #0e453a;
`;

export const ListRidesButton = styled.button`
    height: 50px;
    width: 160px;
    background-color: #03a877;
    color:white;
    border:none;
    border-radius: 15px;
    cursor:pointer;
`;